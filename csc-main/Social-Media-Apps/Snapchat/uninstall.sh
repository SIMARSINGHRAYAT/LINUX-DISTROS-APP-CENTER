#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../../scripts/uninstall-social-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then exec "$LOCAL_SCRIPT" snapchat snapchat; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/scripts/uninstall-social-app.sh | sh -s -- snapchat snapchat
