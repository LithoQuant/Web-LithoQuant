#!/bin/bash
# Wrapper for backward compatibility - delegates to scripts/start-server.sh
echo "[DEPRECATED] start-server.sh at root is deprecated. Use scripts/start-server.sh"
exec "$(dirname "$0")/scripts/start-server.sh"
