import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slideDir = "/tmp/ner-grid-long-slides";
const outputPath = path.join(root, "attached_assets/generated_videos/ner-grid-2-minute-explainer.mp4");
const W = 720;
const H = 1280;

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (x, y, content, size, fill = "#edf5ff", weight = 400, letter = 0, anchor = "start") =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="DejaVu Sans,Arial,sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${letter}" text-anchor="${anchor}">${esc(content)}</text>`;
const rect = (x, y, w, h, fill, r = 0, stroke = "none", opacity = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" opacity="${opacity}"/>`;
const line = (x1, y1, x2, y2, stroke = "#355171", width = 1, opacity = 1, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
const circle = (cx, cy, r, fill, opacity = 1, stroke = "none", strokeWidth = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

function chrome(content, number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#081321"/><stop offset="1" stop-color="#112a42"/></linearGradient>
    <radialGradient id="halo"><stop offset="0" stop-color="#659cff" stop-opacity=".26"/><stop offset="1" stop-color="#659cff" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#75a4df" stroke-opacity=".08"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="560" cy="250" r="330" fill="url(#halo)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  ${rect(48, 50, 42, 42, "#6b9cf5", 10)}
  ${circle(69, 71, 11, "none", 1, "#081321", 3)}
  ${circle(69, 71, 3.5, "#081321")}
  ${text(104, 69, "NER GRID", 18, "#edf5ff", 600, 2)}
  ${text(104, 86, "SMART LOGISTICS", 8, "#7892b0", 500, 2)}
  ${text(672, 76, `FIELD BRIEF  /  ${String(number).padStart(2, "0")}`, 10, "#7892b0", 500, 1.3, "end")}
  ${content}
  ${line(48, 1190, 672, 1190, "#365170", 1, .7)}
  ${text(48, 1225, "NER GRID  /  SMART LOGISTICS & ACCESSIBILITY", 12, "#7892b0", 500, 1.4)}
  ${text(672, 1225, "NORTHEAST INDIA", 12, "#7892b0", 500, 1.2, "end")}
  ${rect(48, 1242, 624, 3, "#1b3552", 2)}
  ${rect(48, 1242, 52 * number, 3, "#6b9cf5", 2)}
  </svg>`;
}

function map(x, y, scale = 1) {
  const p = (value) => value * scale;
  return `${rect(x, y, p(624), p(400), "#10263c", 18, "#355171")}
    ${text(x + p(24), y + p(32), "LIVE REGIONAL NETWORK", 10, "#8aa5c2", 500, 1.5)}
    ${text(x + p(600), y + p(32), "09:42 IST", 10, "#617d9d", 400, 1, "end")}
    <path d="M${x + p(120)} ${y + p(82)} L${x + p(225)} ${y + p(54)} L${x + p(309)} ${y + p(95)} L${x + p(399)} ${y + p(72)} L${x + p(455)} ${y + p(154)} L${x + p(416)} ${y + p(221)} L${x + p(350)} ${y + p(327)} L${x + p(235)} ${y + p(305)} L${x + p(160)} ${y + p(255)} L${x + p(86)} ${y + p(166)} Z" fill="#1e4861" stroke="#56879b" stroke-width="2"/>
    ${line(x + p(80), y + p(210), x + p(215), y + p(115), "#47c98b", 4, 1, "10 9")}
    ${line(x + p(215), y + p(115), x + p(330), y + p(195), "#e4b84b", 4, 1, "10 9")}
    ${line(x + p(330), y + p(195), x + p(425), y + p(115), "#ee6f72", 4, 1, "10 9")}
    ${line(x + p(215), y + p(115), x + p(280), y + p(305), "#47c98b", 4, 1, "10 9")}
    ${line(x + p(280), y + p(305), x + p(430), y + p(285), "#ee6f72", 4, 1, "10 9")}
    ${circle(x + p(80), y + p(210), p(6), "#47c98b", 1, "#dffaff", 1.5)}
    ${circle(x + p(215), y + p(115), p(6), "#47c98b", 1, "#dffaff", 1.5)}
    ${circle(x + p(330), y + p(195), p(6), "#e4b84b", 1, "#dffaff", 1.5)}
    ${circle(x + p(425), y + p(115), p(6), "#ee6f72", 1, "#dffaff", 1.5)}
    ${circle(x + p(280), y + p(305), p(6), "#ee6f72", 1, "#dffaff", 1.5)}
    ${text(x + p(95), y + p(214), "NH-27", 10, "#c5d7e8", 500)}
    ${text(x + p(230), y + p(119), "NH-6", 10, "#c5d7e8", 500)}
    ${text(x + p(345), y + p(199), "NH-10", 10, "#c5d7e8", 500)}
    ${text(x + p(440), y + p(119), "NH-2", 10, "#c5d7e8", 500)}
    ${text(x + p(295), y + p(309), "NH-306", 10, "#c5d7e8", 500)}`;
}

function card(x, y, w, h, title, value, detail, color = "#6b9cf5") {
  return `${rect(x, y, w, h, "#11263d", 16, "#355171")}
    ${rect(x + 18, y + 18, 5, h - 36, color, 3)}
    ${text(x + 42, y + 36, title, 10, "#7895b1", 500, 1.2)}
    ${text(x + 42, y + 82, value, 30, "#edf5ff", 600)}
    ${text(x + 42, y + 111, detail, 11, "#9cb1c7", 400)}`;
}

function slide(number) {
  let c = "";
  if (number === 1) {
    c = `${text(48, 300, "KEEP THE", 58, "#eff5fc", 600, -1.5)}
      ${text(48, 366, "REGION", 58, "#6b9cf5", 600, -1.5)}
      ${text(48, 432, "MOVING.", 58, "#eff5fc", 600, -1.5)}
      ${text(48, 490, "A smart logistics and accessibility command center", 17, "#a5b9cf", 400)}
      ${text(48, 518, "for Northeast India.", 17, "#a5b9cf", 400)}
      ${rect(48, 610, 624, 250, "#10263c", 20, "#355171")}
      ${text(78, 665, "ONE SHARED VIEW", 12, "#88a4c2", 500, 1.8)}
      ${text(78, 725, "18", 48, "#edf5ff", 600)}
      ${text(175, 725, "routes monitored", 15, "#9cb1c7", 400)}
      ${text(78, 792, "08", 48, "#edf5ff", 600)}
      ${text(175, 792, "states connected", 15, "#9cb1c7", 400)}
      ${text(78, 832, "Live data → clear decisions → safer movement", 12, "#6b9cf5", 500)}`;
  } else if (number === 2) {
    c = `${text(48, 210, "THE LOGISTICS", 16, "#6b9cf5", 600, 2)}
      ${text(48, 260, "CHALLENGE", 46, "#eff5fc", 600, -1)}
      ${text(48, 312, "Routes change faster than spreadsheets.", 18, "#a5b9cf", 400)}
      ${card(48, 400, 292, 155, "WEATHER", "Heavy rain", "Visibility and slope risk", "#e4b84b")}
      ${card(380, 400, 292, 155, "TERRAIN", "Mountain roads", "Access changes quickly", "#6b9cf5")}
      ${card(48, 585, 292, 155, "ROAD CONDITION", "Closures", "Delays cascade across routes", "#ee6f72")}
      ${card(380, 585, 292, 155, "INCIDENTS", "Past patterns", "Risk signals get missed", "#47c98b")}
      ${text(48, 850, "NER GRID brings these signals together", 22, "#edf5ff", 600)}
      ${text(48, 890, "before the next journey begins.", 22, "#6b9cf5", 600)}`;
  } else if (number === 3) {
    c = `${text(48, 195, "01  /  SEE THE NETWORK", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Every route, on one live map.", 35, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Monitor roads, regions, and access status", 16, "#9cb1c7", 400)}
      ${map(48, 360)}
      ${circle(76, 810, 7, "#47c98b")}${text(95, 815, "Accessible", 12, "#b7cadc", 500)}
      ${circle(214, 810, 7, "#e4b84b")}${text(233, 815, "Delayed", 12, "#b7cadc", 500)}
      ${circle(334, 810, 7, "#ee6f72")}${text(353, 815, "High risk", 12, "#b7cadc", 500)}
      ${text(48, 905, "A route is more than a line.", 25, "#edf5ff", 600)}
      ${text(48, 943, "It is a decision with context.", 25, "#6b9cf5", 600)}`;
  } else if (number === 4) {
    c = `${text(48, 195, "02  /  SCORE THE RISK", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Explainable risk, not a black box.", 34, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Every score shows the signals behind it.", 16, "#9cb1c7", 400)}
      ${rect(48, 360, 300, 390, "#11263d", 18, "#355171")}
      ${text(78, 402, "ROUTE RISK ENGINE", 10, "#88a4c2", 500, 1.4)}
      ${text(78, 440, "NH-2  DIMAPUR — IMPHAL", 14, "#edf5ff", 600)}
      ${circle(198, 560, 92, "none", 1, "#263f5e", 15)}
      <circle cx="198" cy="560" r="92" fill="none" stroke="#ee6f72" stroke-width="15" stroke-linecap="round" stroke-dasharray="445 578" transform="rotate(-90 198 560)"/>
      ${text(198, 570, "86", 45, "#edf5ff", 600, 0, "middle")}
      ${text(198, 596, "HIGH RISK", 10, "#ee8181", 600, 1, "middle")}
      ${text(78, 670, "Heavy rainfall", 12, "#a5b9cf", 400)}
      ${text(78, 700, "Mountain terrain", 12, "#a5b9cf", 400)}
      ${text(78, 730, "5 past incidents", 12, "#a5b9cf", 400)}
      ${card(380, 360, 292, 110, "WEATHER", "High", "Rainfall intensity", "#e4b84b")}
      ${card(380, 500, 292, 110, "TERRAIN", "Steep", "Slope exposure", "#ee6f72")}
      ${card(380, 640, 292, 110, "HISTORY", "5 events", "Past incidents", "#6b9cf5")}`;
  } else if (number === 5) {
    c = `${text(48, 195, "03  /  KEEP ACCESS VISIBLE", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Accessibility is a live status.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Teams can see where movement is safe, delayed, or blocked.", 16, "#9cb1c7", 400)}
      ${map(48, 360)}
      ${rect(48, 810, 624, 100, "#11263d", 16, "#355171")}
      ${text(78, 852, "ACCESSIBILITY INDEX", 10, "#88a4c2", 500, 1.4)}
      ${text(78, 888, "72%", 30, "#47c98b", 600)}
      ${text(176, 888, "of monitored routes currently accessible", 13, "#a5b9cf", 400)}
      ${text(48, 980, "The map helps people choose the next best route.", 20, "#edf5ff", 600)}`;
  } else if (number === 6) {
    c = `${text(48, 195, "04  /  ACT ON ALERTS", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Turn a signal into an action.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Alerts are prioritized, explained, and tied to a place.", 16, "#9cb1c7", 400)}
      ${rect(48, 380, 624, 220, "#11263d", 18, "#355171")}
      ${circle(93, 432, 18, "#ee6f72", .17)}${text(93, 440, "!", 19, "#ee8080", 700, 0, "middle")}
      ${text(130, 424, "ACTIVE WATCH / CRITICAL", 10, "#ee8080", 600, 1.2)}
      ${text(130, 462, "Landslide risk near Dimapur", 18, "#edf5ff", 600)}
      ${text(130, 495, "Heavy rainfall has increased slope movement risk.", 11, "#9cb1c7", 400)}
      ${text(130, 530, "Avoid night movement  ·  Nagaland", 11, "#e4bd69", 500)}
      ${line(48, 650, 672, 650, "#355171", 1)}
      ${text(48, 700, "Monitor", 18, "#edf5ff", 600)}
      ${text(48, 730, "Detect", 18, "#6b9cf5", 600)}
      ${text(48, 760, "Notify", 18, "#e4bd69", 600)}
      ${text(48, 790, "Reroute", 18, "#47c98b", 600)}
      ${line(190, 692, 590, 692, "#355171", 2)}
      ${circle(250, 692, 7, "#6b9cf5")}${circle(350, 692, 7, "#e4bd69")}${circle(450, 692, 7, "#47c98b")}${circle(550, 692, 7, "#47c98b")}`;
  } else if (number === 7) {
    c = `${text(48, 195, "05  /  READ THE PATTERN", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Analytics that explain the week.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "See where risk is rising and where access is holding.", 16, "#9cb1c7", 400)}
      ${rect(48, 360, 624, 390, "#11263d", 18, "#355171")}
      ${text(78, 405, "ROUTE CONDITIONS / LAST 7 DAYS", 10, "#88a4c2", 500, 1.3)}
      ${line(88, 680, 630, 680, "#355171", 1)}
      ${line(88, 460, 88, 680, "#355171", 1)}
      ${rect(120, 590, 42, 90, "#47c98b", 6)}${rect(205, 540, 42, 140, "#6b9cf5", 6)}${rect(290, 500, 42, 180, "#e4b84b", 6)}${rect(375, 455, 42, 225, "#ee6f72", 6)}${rect(460, 525, 42, 155, "#e4b84b", 6)}${rect(545, 480, 42, 200, "#6b9cf5", 6)}
      ${text(120, 710, "MON", 9, "#7895b1", 500)}${text(205, 710, "TUE", 9, "#7895b1", 500)}${text(290, 710, "WED", 9, "#7895b1", 500)}${text(375, 710, "THU", 9, "#7895b1", 500)}${text(460, 710, "FRI", 9, "#7895b1", 500)}${text(545, 710, "SAT", 9, "#7895b1", 500)}
      ${card(48, 815, 190, 120, "HIGH RISK", "06", "routes today", "#ee6f72")}
      ${card(265, 815, 190, 120, "ACCESSIBLE", "12", "routes today", "#47c98b")}
      ${card(482, 815, 190, 120, "WATCHLIST", "04", "routes today", "#e4b84b")}`;
  } else if (number === 8) {
    c = `${text(48, 195, "06  /  WORK AS ONE TEAM", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "A clear daily operating loop.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "From the morning brief to the final field update.", 16, "#9cb1c7", 400)}
      ${card(48, 390, 280, 150, "01  MONITOR", "Map", "Watch every route", "#6b9cf5")}
      ${card(392, 390, 280, 150, "02  ASSESS", "Score", "Understand risk", "#e4b84b")}
      ${card(48, 585, 280, 150, "03  ALERT", "Notify", "Reach the right team", "#ee6f72")}
      ${card(392, 585, 280, 150, "04  ACT", "Move", "Reroute with confidence", "#47c98b")}
      ${line(188, 780, 532, 780, "#355171", 2)}
      ${circle(188, 780, 8, "#6b9cf5")}${circle(302, 780, 8, "#e4b84b")}${circle(416, 780, 8, "#ee6f72")}${circle(532, 780, 8, "#47c98b")}
      ${text(48, 895, "One shared system.", 27, "#edf5ff", 600)}
      ${text(48, 935, "Fewer surprises.", 27, "#6b9cf5", 600)}
      ${text(48, 975, "Better movement.", 27, "#47c98b", 600)}`;
  } else if (number === 9) {
    c = `${text(48, 195, "07  /  DESIGN FOR FIELD TEAMS", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Useful when the network is under pressure.", 33, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Responsive views keep the essentials close at hand.", 16, "#9cb1c7", 400)}
      ${rect(92, 365, 250, 500, "#11263d", 24, "#355171")}
      ${rect(112, 410, 210, 65, "#1a3855", 12)}${text(132, 438, "ACTIVE ALERT", 9, "#ee8080", 600, 1)}${text(132, 460, "NH-2 / HIGH RISK", 12, "#edf5ff", 600)}
      ${rect(112, 500, 210, 170, "#1a3855", 12)}${text(132, 532, "ROUTE STATUS", 9, "#88a4c2", 500, 1)}${text(132, 585, "86", 45, "#ee8080", 600)}${text(132, 610, "risk score", 10, "#9cb1c7", 400)}
      ${rect(112, 695, 210, 130, "#1a3855", 12)}${text(132, 725, "NEXT ACTION", 9, "#88a4c2", 500, 1)}${text(132, 765, "Reroute", 22, "#47c98b", 600)}${text(132, 790, "non-essential movement", 10, "#9cb1c7", 400)}
      ${text(400, 475, "FAST", 36, "#edf5ff", 600)}${text(400, 515, "SCAN", 36, "#6b9cf5", 600)}
      ${text(400, 600, "CLEAR", 36, "#edf5ff", 600)}${text(400, 640, "ACTION", 36, "#47c98b", 600)}
      ${text(400, 730, "FIELD", 36, "#edf5ff", 600)}${text(400, 770, "READY", 36, "#e4b84b", 600)}`;
  } else if (number === 10) {
    c = `${text(48, 195, "08  /  MEASURE IMPACT", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "The outcome is safer movement.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "A stronger view of the network supports better decisions.", 16, "#9cb1c7", 400)}
      ${card(48, 390, 280, 170, "ROUTES MONITORED", "18", "across 8 states", "#6b9cf5")}
      ${card(392, 390, 280, 170, "ACTIVE ALERTS", "06", "prioritized today", "#ee6f72")}
      ${card(48, 600, 280, 170, "ACCESSIBILITY", "72%", "routes accessible", "#47c98b")}
      ${card(392, 600, 280, 170, "RISK SIGNALS", "24", "tracked this week", "#e4b84b")}
      ${rect(48, 850, 624, 110, "#1b3855", 16)}
      ${text(78, 895, "Every clear signal gives a field team more time to act.", 17, "#edf5ff", 600)}
      ${text(78, 928, "That is the NER GRID advantage.", 17, "#6b9cf5", 600)}`;
  } else if (number === 11) {
    c = `${text(48, 195, "09  /  BUILT FOR THE REGION", 12, "#6b9cf5", 600, 1.8)}
      ${text(48, 245, "Local context. Practical decisions.", 36, "#eff5fc", 600, -.5)}
      ${text(48, 285, "Designed around the roads, terrain, weather, and communities of the Northeast.", 16, "#9cb1c7", 400)}
      ${map(48, 370, .92)}
      ${text(48, 875, "No single signal tells the whole story.", 22, "#edf5ff", 600)}
      ${text(48, 915, "NER GRID connects the signals that matter.", 22, "#6b9cf5", 600)}
      ${text(48, 980, "Map  ·  Risk  ·  Alerts  ·  Analytics", 14, "#47c98b", 500, 1)}`;
  } else {
    c = `${text(48, 300, "SEE THE", 56, "#eff5fc", 600, -1.5)}
      ${text(48, 366, "ROADS", 56, "#6b9cf5", 600, -1.5)}
      ${text(48, 432, "CLEARLY.", 56, "#eff5fc", 600, -1.5)}
      ${text(48, 500, "Know what needs attention.", 20, "#9cb1c7", 400)}
      ${rect(48, 620, 624, 230, "#11263d", 20, "#355171")}
      ${text(78, 675, "NER GRID / COMMAND CENTER", 11, "#88a4c2", 500, 1.4)}
      ${text(78, 735, "Every journey, informed.", 26, "#edf5ff", 600)}
      ${circle(88, 805, 7, "#47c98b")}${text(108, 810, "Smart logistics for a connected Northeast.", 14, "#b7cadc", 500)}
      ${text(78, 920, "NER GRID", 18, "#6b9cf5", 600, 2)}
      ${text(78, 955, "MOVE WITH CONFIDENCE.", 13, "#edf5ff", 500, 2)}`;
  }
  return chrome(c, number);
}

await fs.rm(slideDir, { recursive: true, force: true });
await fs.mkdir(slideDir, { recursive: true });
await fs.mkdir(path.dirname(outputPath), { recursive: true });

for (let i = 1; i <= 12; i += 1) {
  await fs.writeFile(path.join(slideDir, `slide-${String(i).padStart(2, "0")}.svg`), slide(i));
}

console.log(`Generated 12 slides in ${slideDir}`);
console.log(`Output will be encoded at ${outputPath}`);