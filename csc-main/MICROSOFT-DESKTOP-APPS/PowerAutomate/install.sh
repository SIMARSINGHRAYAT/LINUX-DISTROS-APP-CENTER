#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../scripts/install-linux-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then LINUX_DESKTOP_DISTRO=debian exec "$LOCAL_SCRIPT" PowerAutomate microsoft-powerautomate 'Microsoft Power Automate' icons8-microsoft-power-automate-2020-96.png "$(CDPATH= cd -- "$(dirname "$0")" && pwd)"; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/MICROSOFT-DESKTOP-APPS/scripts/install-linux-app.sh | LINUX_DESKTOP_DISTRO=debian sh -s -- PowerAutomate microsoft-powerautomate 'Microsoft Power Automate' icons8-microsoft-power-automate-2020-96.png
