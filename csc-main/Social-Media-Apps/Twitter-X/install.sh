#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../../scripts/install-social-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then exec "$LOCAL_SCRIPT" twitter-x 'Twitter (X)' 'https://x.com' twitter-x twitter-x.png; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/scripts/install-social-app.sh | LINUX_DESKTOP_DISTRO=debian sh -s -- twitter-x 'Twitter (X)' 'https://x.com' twitter-x twitter-x.png
