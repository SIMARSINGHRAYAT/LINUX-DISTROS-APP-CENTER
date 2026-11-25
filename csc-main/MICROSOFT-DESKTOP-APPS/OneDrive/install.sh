#!/bin/sh
set -eu
LOCAL_SCRIPT="$(dirname "$0")/../scripts/install-linux-app.sh"
if [ -f "$LOCAL_SCRIPT" ]; then LINUX_DESKTOP_DISTRO=debian exec "$LOCAL_SCRIPT" OneDrive microsoft-onedrive 'Microsoft OneDrive' Microsoft-Onedrive--Streamline-Svg-Logos.png "$(CDPATH= cd -- "$(dirname "$0")" && pwd)"; fi
curl -fsSL https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/raw/refs/heads/main/csc-main/MICROSOFT-DESKTOP-APPS/scripts/install-linux-app.sh | LINUX_DESKTOP_DISTRO=debian sh -s -- OneDrive microsoft-onedrive 'Microsoft OneDrive' Microsoft-Onedrive--Streamline-Svg-Logos.png
