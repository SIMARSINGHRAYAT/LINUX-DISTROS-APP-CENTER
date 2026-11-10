'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('googleApps', Object.freeze({
  open: (url) => ipcRenderer.invoke('open-service', url)
}));
