import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frameDir = "/tmp/ner-grid-video-frames";
const outputPath = path.join(root, "attached_assets/generated_videos/ner-grid-mobile-explainer.mp4");
const width = 720;
const height = 1280;
const fps = 30;
const duration = 8;
const totalFrames = fps * duration;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const fade = (time, start, end) => ease(clamp((time - start) / (end - start)));
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n = (value) => Number(value.toFixed(2));

function text(x, y, content, size, fill = "#dfeeff", weight = 400, letter = 0, anchor = "start") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="DejaVu Sans,Arial,sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${letter}" text-anchor="${anchor}">${esc(content)}</text>`;
}

function rect(x, y, w, h, fill, radius = 0, stroke = "none", opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" opacity="${n(opacity)}"/>`;
}

function line(x1, y1, x2, y2, stroke, width = 1, opacity = 1, dash = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" opacity="${n(opacity)}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
}

function circle(cx, cy, r, fill, opacity = 1, stroke = "none", strokeWidth = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${n(opacity)}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function shell(content, time) {
  const progress = time / duration;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#081321"/><stop offset="1" stop-color="#0f2539"/></linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cadff"/><stop offset="1" stop-color="#4b7ddd"/></linearGradient>
    <linearGradient id="mint" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#47c98b"/><stop offset="1" stop-color="#83e4b2"/></linearGradient>
    <radialGradient id="glow"><stop offset="0" stop-color="#5f9eff" stop-opacity=".28"/><stop offset="1" stop-color="#5f9eff" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#6e9cdb" stroke-opacity=".08"/></pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="570" cy="230" r="300" fill="url(#glow)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  ${content}
  ${line(48, 1190, 672, 1190, "#365170", 1, .65)}
  ${text(48, 1225, "NER GRID  /  SMART LOGISTICS", 12, "#7892b0", 500, 2)}
  ${text(672, 1225, `${String(Math.round(progress * 100)).padStart(2, "0")}%`, 12, "#7892b0", 500, 2, "end")}
  ${rect(48, 1242, 624, 3, "#1b3552", 2)}
  ${rect(48, 1242, 624 * clamp(progress), 3, "#6b9cf5", 2)}
  </svg>`;
  return svg;
}

function logo(x, y, opacity = 1) {
  return `${rect(x, y, 42, 42, "#6b9cf5", 10, "none", opacity)}
  ${circle(x + 21, y + 21, 11, "none", opacity, "#081321", 3)}
  ${circle(x + 21, y + 21, 3.5, "#081321", opacity)}
  ${text(x + 56, y + 19, "NER GRID", 18, "#edf5ff", 600, 2, "start")}
  ${text(x + 56, y + 35, "SMART LOGISTICS", 8, "#7892b0", 500, 2)}`;
}

function mapGraphic(x, y, w, h, time, opacity = 1) {
  const mapReveal = fade(time, 1.25, 2.55);
  const routes = [
    [x + 80, y + 210, x + 215, y + 115, "#47c98b", .95],
    [x + 215, y + 115, x + 330, y + 195, "#e4b84b", .9],
    [x + 330, y + 195, x + 425, y + 115, "#ee6f72", .85],
    [x + 215, y + 115, x + 280, y + 305, "#47c98b", .8],
    [x + 280, y + 305, x + 430, y + 285, "#ee6f72", .75],
  ];
  const nodes = [
    [x + 80, y + 210, "NH-27", "#47c98b"],
    [x + 215, y + 115, "NH-6", "#47c98b"],
    [x + 330, y + 195, "NH-10", "#e4b84b"],
    [x + 425, y + 115, "NH-2", "#ee6f72"],
    [x + 280, y + 305, "NH-306", "#ee6f72"],
  ];
  let out = `${rect(x, y, w, h, "#102239", 18, "#355171", opacity)}${rect(x + 1, y + 1, w - 2, h - 2, "url(#grid)", 17, "none", opacity)}
  ${text(x + 24, y + 31, "NORTH EASTERN REGION / LIVE NETWORK", 10, "#8aa5c2", 500, 1.3)}
  ${text(x + w - 24, y + 31, "09:42 IST", 10, "#617d9d", 400, 1, "end")}
  <path d="M${x + 121} ${y + 82} L${x + 225} ${y + 54} L${x + 309} ${y + 95} L${x + 399} ${y + 72} L${x + 455} ${y + 154} L${x + 416} ${y + 221} L${x + 350} ${y + 327} L${x + 235} ${y + 305} L${x + 160} ${y + 255} L${x + 86} ${y + 166} Z" fill="#1e4861" fill-opacity="${n(.8 * mapReveal * opacity)}" stroke="#56879b" stroke-width="2" opacity="${n(opacity)}"/>`;
  routes.forEach(([x1, y1, x2, y2, color, routeOpacity], index) => {
    const draw = clamp((time - 1.4 - index * .14) / .75);
    out += line(x1, y1, x1 + (x2 - x1) * draw, y1 + (y2 - y1) * draw, color, 3, draw * routeOpacity * opacity, "9 9");
  });
  nodes.forEach(([cx, cy, label, color], index) => {
    const show = fade(time, 1.65 + index * .12, 2.05 + index * .12) * opacity;
    out += circle(cx, cy, 13, color, .11 * show) + circle(cx, cy, 5.5, color, show, "#dffaff", 1.5) + text(cx + 13, cy + 4, label, 10, "#c5d7e8", 500, .5, "start");
  });
  return out;
}

function scoreCard(x, y, time, opacity = 1) {
  const reveal = fade(time, 2.55, 3.2) * opacity;
  const scoreProgress = clamp((time - 2.9) / 1.1);
  const score = Math.round(86 * scoreProgress);
  return `${rect(x, y, 286, 240, "#11243a", 18, "#355171", reveal)}
  ${text(x + 24, y + 32, "ROUTE RISK ENGINE", 10, "#88a4c2", 500, 1.4, "start")}
  ${text(x + 24, y + 64, "NH-2  DIMAPUR — IMPHAL", 15, "#e8f3ff", 600, .3)}
  ${circle(x + 85, y + 137, 51, "none", reveal, "#263f5e", 10)}
  <circle cx="${x + 85}" cy="${y + 137}" r="51" fill="none" stroke="#ee6f72" stroke-width="10" stroke-linecap="round" stroke-dasharray="${n(320 * scoreProgress)} 400" transform="rotate(-90 ${x + 85} ${y + 137})" opacity="${n(reveal)}"/>
  ${text(x + 85, y + 143, String(score), 28, "#f1f6fc", 600, 0, "middle")}
  ${text(x + 85, y + 163, "RISK SCORE", 8, "#8ba3bc", 500, 1, "middle")}
  ${text(x + 158, y + 120, "HIGH", 13, "#ee8181", 600, 1)}
  ${text(x + 158, y + 147, "Heavy rainfall", 11, "#a3b7cc", 400)}
  ${text(x + 158, y + 168, "Mountain terrain", 11, "#a3b7cc", 400)}
  ${text(x + 158, y + 189, "5 past incidents", 11, "#a3b7cc", 400)}
  ${rect(x + 24, y + 202, 238, 1, "#2a435e", 0, "none", reveal)}
  ${text(x + 24, y + 225, "HOLD OR REROUTE NON-ESSENTIAL MOVEMENT", 8, "#e7bd69", 500, .6)}`;
}

function alertCard(x, y, time, opacity = 1) {
  const reveal = fade(time, 4.1, 4.8) * opacity;
  const chart = clamp((time - 4.8) / 1.1);
  return `${rect(x, y, 590, 152, "#11243a", 18, "#355171", reveal)}
  ${circle(x + 35, y + 38, 16, "#ee6f72", .14 * reveal)}
  ${text(x + 35, y + 44, "!", 17, "#ee8080", 700, 0, "middle")}
  ${text(x + 67, y + 32, "ACTIVE WATCH / CRITICAL", 9, "#ee8080", 600, 1.2)}
  ${text(x + 67, y + 59, "Landslide risk near Dimapur", 17, "#e9f3fd", 600)}
  ${text(x + 67, y + 85, "Heavy rainfall has increased slope movement risk.", 11, "#8fa8c1", 400)}
  ${text(x + 67, y + 112, "Avoid night movement  ·  Nagaland", 10, "#e4bd69", 500, .3)}
  ${line(x + 420, y + 31, x + 420, y + 120, "#2a435e", 1, reveal)}
  ${text(x + 455, y + 48, "SIGNALS", 9, "#7893b0", 500, 1.2)}
  ${text(x + 455, y + 83, "06", 30, "#e9f3fd", 600)}
  ${text(x + 497, y + 82, "today", 10, "#8fa8c1", 400)}
  <polyline points="${x + 455},${y + 108} ${x + 475},${y + 92} ${x + 494},${y + 101} ${x + 514},${y + 72} ${x + 536},${y + 83} ${x + 555},${y + 58}" fill="none" stroke="#6b9cf5" stroke-width="3" opacity="${n(chart)}"/>`;
}

function frame(time) {
  let content = "";
  const intro = 1 - fade(time, .8, 1.35);
  const mapOpacity = fade(time, 1.1, 1.6) * (1 - fade(time, 2.8, 3.6));
  const scoreOpacity = fade(time, 2.55, 3.15) * (1 - fade(time, 4.0, 4.6));
  const alertsOpacity = fade(time, 4.1, 4.75) * (1 - fade(time, 5.45, 6.1));
  const finalOpacity = fade(time, 6.1, 7.2);

  content += `<g opacity="${n(intro)}">${logo(48, 52, 1)}
    ${text(48, 300, "KEEP THE", 57, "#eff5fc", 600, -1.5, "start")}
    ${text(48, 365, "REGION", 57, "#6b9cf5", 600, -1.5)}
    ${text(48, 430, "MOVING.", 57, "#eff5fc", 600, -1.5)}
    ${text(48, 485, "One shared view for every road,", 18, "#a5b9cf", 400, 0)}
    ${text(48, 512, "route, and field decision.", 18, "#a5b9cf", 400, 0)}
    ${circle(54, 585, 5, "#6b9cf5", 1)}${text(70, 590, "SMART LOGISTICS INTELLIGENCE", 10, "#86a1be", 500, 1.4)}
  </g>`;

  content += mapGraphic(48, 570, 624, 440, time, mapOpacity);
  content += scoreCard(48, 600, time, scoreOpacity);
  content += alertCard(48, 850, time, alertsOpacity);

  const finalY = 690 - 70 * finalOpacity;
  content += `<g opacity="${n(finalOpacity)}">${rect(48, finalY, 624, 375, "#10243a", 20, "#355171", 1)}
    ${text(78, finalY + 43, "NER GRID / COMMAND CENTER", 10, "#88a4c2", 500, 1.3)}
    ${text(78, finalY + 85, "See the roads clearly.", 28, "#eff6ff", 600, -.5)}
    ${text(78, finalY + 115, "Know what needs attention.", 16, "#90a9c3", 400)}
    ${line(78, finalY + 155, 642, finalY + 155, "#2e4967", 1, finalOpacity)}
    ${text(78, finalY + 190, "ROUTES MONITORED", 9, "#7692ae", 500, 1)}
    ${text(78, finalY + 228, "18", 34, "#edf6ff", 600)}
    ${text(200, finalY + 190, "STATES CONNECTED", 9, "#7692ae", 500, 1)}
    ${text(200, finalY + 228, "08", 34, "#edf6ff", 600)}
    ${text(322, finalY + 190, "ACTIVE ALERTS", 9, "#7692ae", 500, 1)}
    ${text(322, finalY + 228, "06", 34, "#edf6ff", 600)}
    ${rect(78, finalY + 267, 534, 42, "#1c3652", 8, "none", finalOpacity)}
    ${circle(101, finalY + 288, 6, "#47c98b", finalOpacity)}
    ${text(119, finalY + 293, "Every journey, informed.", 13, "#cfe2f6", 500)}
    ${text(600, finalY + 293, "↗", 19, "#6b9cf5", 500, 0, "end")}</g>`;

  return shell(content, time);
}

await fs.rm(frameDir, { recursive: true, force: true });
await fs.mkdir(frameDir, { recursive: true });
await fs.mkdir(path.dirname(outputPath), { recursive: true });

for (let index = 0; index < totalFrames; index += 1) {
  const time = index / fps;
  await fs.writeFile(path.join(frameDir, `frame-${String(index).padStart(4, "0")}.svg`), frame(time));
}

console.log(`Generated ${totalFrames} SVG frames in ${frameDir}`);
console.log(`Output will be encoded at ${outputPath}`);