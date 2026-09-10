#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Keep post-merge setup deterministic and non-interactive. The root install
# provides the shared dependency tree used by the backend and frontend scripts.
npm install --no-audit --no-fund

# Re-apply the committed demo dataset to the configured storage adapter.
# This is safe in JSON fallback mode and uses MongoDB when MONGODB_URI is set.
npm run seed

# Catch frontend dependency/configuration regressions before workflows restart.
npm run build --prefix frontend

echo "Post-merge setup completed successfully."