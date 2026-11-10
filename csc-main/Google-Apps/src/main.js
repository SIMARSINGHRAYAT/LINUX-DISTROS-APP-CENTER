'use strict';

const { app, BrowserWindow, Menu, session, shell, ipcMain } = require('electron');
const path = require('node:path');

const PARTITION = 'persist:google-apps';
const HUB_URL = `file://${path.join(__dirname, '..', 'index.html')}`;
const BROWSER_USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
const GOOGLE_HOSTS = new Set([
  'google.com', 'googleusercontent.com', 'gstatic.com', 'googleapis.com',
  'youtube.com', 'ytimg.com', 'youtube-nocookie.com'
]);
let mainWindow;

function isTrusted(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      [...GOOGLE_HOSTS].some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
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

function applyNavigationPolicy(window) {
  const contents = window.webContents;
  contents.setWindowOpenHandler(({ url }) => {
    if (!isTrusted(url)) {
      openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
  contents.on('will-navigate', (event, url) => {
    if (url !== HUB_URL && !isTrusted(url)) {
      event.preventDefault();
      openExternal(url);
    }
  });
  contents.on('did-fail-load', (_event, code, _description, _validatedURL, isMainFrame) => {
    if (isMainFrame && code !== -3) void window.loadFile(path.join(__dirname, '..', 'index.html'));
  });
}

function createMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Google Apps', submenu: [
      { label: 'Home', click: () => mainWindow?.loadURL(HUB_URL) },
      { type: 'separator' },
      { role: 'close' }
    ] },
    { label: 'Navigation', submenu: [
      { role: 'back' }, { role: 'forward' }, { role: 'reload' }
    ] },
    { label: 'Account', submenu: [
      { label: 'Clear Google Session', click: async () => {
        await session.fromPartition(PARTITION).clearStorageData();
        await mainWindow?.loadURL(HUB_URL);
      } }
    ] },
    { label: 'View', submenu: [
      { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' },
      ...(app.isPackaged ? [] : [{ role: 'toggleDevTools' }])
    ] }
  ]));
}

ipcMain.handle('open-service', (_event, value) => {
  if (!isTrusted(value)) throw new Error('Unsupported Google service URL.');
  return mainWindow?.loadURL(value);
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.whenReady().then(async () => {
    const appSession = session.fromPartition(PARTITION);
    appSession.setUserAgent(BROWSER_USER_AGENT);
    app.on('web-contents-created', (_event, contents) => contents.setUserAgent(BROWSER_USER_AGENT));
    appSession.setPermissionRequestHandler((contents, permission, callback) => {
      let origin;
      try { origin = new URL(contents.getURL()); } catch { callback(false); return; }
      callback(origin.protocol === 'https:' && isTrusted(origin.toString()) &&
        new Set(['notifications', 'clipboard-read', 'clipboard-sanitized-write']).has(permission));
    });
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 900,
      minHeight: 650,
      title: 'Google Apps',
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
    createMenu();
    await mainWindow.loadURL(HUB_URL);
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}
