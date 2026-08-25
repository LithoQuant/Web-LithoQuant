#!/bin/bash
# LithoQuant Website - Local Preview
# Moved to scripts/ for cleaner project structure

# Ensure we serve from project root regardless of where script is invoked
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || exit 1

echo "========================================"
echo "  LithoQuant Website - Local Preview"
echo "========================================"
echo ""
echo "Starting local web server..."
echo ""
echo "Website akan tersedia di:"
echo "  http://localhost:8000"
echo ""
echo "Project root: $PROJECT_ROOT"
echo "Tekan Ctrl+C untuk stop server"
echo "========================================"
echo ""

python3 -m http.server 8000
