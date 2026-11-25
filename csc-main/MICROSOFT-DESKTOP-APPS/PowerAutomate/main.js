'use strict';

const { app, BrowserWindow, Menu, session, shell, ipcMain } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const APP_NAME = 'Microsoft Power Automate';
const APP_URL = 'https://make.powerautomate.com/';
const HELP_URL = 'https://www.microsoft.com/en-in/power-platform/products/power-automate';
const PARTITION = 'persist:microsoft-powerautomate';
const BROWSER_USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
const APP_HOSTS = new Set(['powerautomate.com', 'powerplatform.com', 'flow.microsoft.com', 'logic.azure.com', 'azure.com', 'azureedge.net']);
const AUTH_HOSTS = new Set([
  'microsoft.com', 'microsoftonline.com', 'office.com', 'office365.com', 'microsoft365.com',
  'live.com', 'cloud.microsoft', 'msauth.net', 'msftauth.net', 'msidentity.com', 'office.net'
]);
const PERMISSIONS = new Set(['notifications', 'clipboard-read', 'clipboard-sanitized-write']);
let mainWindow;
let statePath;

function isTrustedUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      [...APP_HOSTS, ...AUTH_HOSTS].some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

function openExternal(value) {
  try {
    const url = new URL(value);
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) void shell.openExternal(url.toString());
  } catch {}
}

function readWindowState() {
  try {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    if ([state.width, state.height].every(Number.isInteger)) return state;
  } catch {}
  return { width: 1400, height: 900 };
}

function saveWindowState() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(mainWindow.getNormalBounds()));
}

function configureSession(appSession) {
  appSession.setPermissionRequestHandler((contents, permission, callback) => {
    let origin;
    try {
      origin = new URL(contents.getURL());
    } catch {
      callback(false);
      return;
    }
    callback(origin.protocol === 'https:' && isTrustedUrl(origin.toString()) && PERMISSIONS.has(permission));
  });
  appSession.setPermissionCheckHandler((contents, permission, requestingOrigin) => (
    PERMISSIONS.has(permission) && isTrustedUrl(requestingOrigin || contents.getURL())
  ));
  appSession.on('will-download', (_event, item) => {
    item.setSavePath(path.join(app.getPath('downloads'), item.getFilename()));
  });
}

function applyNavigationPolicy(window) {
  const contents = window.webContents;
  contents.setUserAgent(BROWSER_USER_AGENT);
  contents.setWindowOpenHandler(({ url }) => {
    if (!isTrustedUrl(url)) {
      openExternal(url);
      return { action: 'deny' };
    }
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        width: 1100,
        height: 800,
        title: APP_NAME,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: true,
          webSecurity: true,
          partition: PARTITION
        }
      }
    };
  });
  contents.on('did-create-window', applyNavigationPolicy);
  for (const eventName of ['will-navigate', 'will-redirect']) {
    contents.on(eventName, (event, url) => {
      if (!isTrustedUrl(url)) {
        event.preventDefault();
        openExternal(url);
      }
    });
  }
  contents.on('did-fail-load', (_event, errorCode, _description, _url, isMainFrame) => {
    if (isMainFrame && errorCode !== -3) void window.loadFile(path.join(__dirname, 'offline.html'));
  });
  contents.on('render-process-gone', () => {
    if (!window.isDestroyed()) void window.loadURL(APP_URL);
  });
}

function createMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'File', submenu: [{ label: 'Reload', role: 'reload' }, { role: 'back' }, { role: 'forward' }, { type: 'separator' }, { role: 'close' }] },
    { label: 'View', submenu: [{ role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' }, { role: 'togglefullscreen' }, ...(app.isPackaged ? [] : [{ role: 'toggleDevTools', accelerator: 'CommandOrControl+Shift+I' }])] },
    { label: 'Account', submenu: [{ label: 'Clear Session Data', click: async () => { await session.fromPartition(PARTITION).clearStorageData(); await mainWindow?.loadURL(APP_URL); } }] },
    { label: 'Help', submenu: [{ label: 'Official Website', click: () => openExternal(HELP_URL) }, { role: 'about' }] }
  ]));
}

async function createWindow() {
  statePath = path.join(app.getPath('userData'), 'window-state.json');
  mainWindow = new BrowserWindow({
    ...readWindowState(),
    minWidth: 900,
    minHeight: 600,
    title: APP_NAME,
    icon: path.join(__dirname, 'assets/icons/512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      partition: PARTITION
    }
  });
  applyNavigationPolicy(mainWindow);
  mainWindow.on('resize', saveWindowState);
  mainWindow.on('move', saveWindowState);
  mainWindow.on('closed', () => { mainWindow = null; });
  await mainWindow.loadURL(APP_URL);
}

ipcMain.handle('retry-load', () => mainWindow?.loadURL(APP_URL));

if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.whenReady().then(async () => {
    configureSession(session.fromPartition(PARTITION));
    createMenu();
    await createWindow();
    app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) void createWindow(); });
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
  app.on('before-quit', saveWindowState);
}
