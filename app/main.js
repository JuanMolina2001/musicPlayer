const { app, BrowserWindow } = require('electron/main')
const { AdminPlayList, config } = require('./db.js')
const puppeteer = require('puppeteer')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const setMainMenu = require('./menu.js')

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1280,
    minHeight: 650,
    minWidth: 550,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)

  win.loadURL('http://localhost:5173/');

  setMainMenu(win)

}

// async function puppeteerTest() {
//   await new Promise(resolve => win.webContents.on('dom-ready', resolve));

//   // Obtener la instancia del navegador de Electron
//   const electronBrowser = await win.webContents.browserWindowOptions.webPreferences.session;

//   // Crear una página Puppeteer directamente, ya que obtener el endpoint del WebSocket puede ser complicado en Electron
//   const browser = await puppeteer.connect({
//     browserURL: 'http://localhost:9222',
//   });

//   // Ejemplo de uso de Puppeteer para realizar acciones en la ventana de Electron
//   const page = await browser.newPage();
//   await page.goto('http://www.example.com');
//   const title = await page.title();
//   console.log(title);

//   // Cerrar la página Puppeteer
//   await page.close();
// }

app.whenReady().then(() => {
  createWindow()
  AdminPlayList()
  config()
  // puppeteerTest().then(() => {
  //   console.log('Puppeteer connected')
  // }).catch((err) => {
  //   console.error('Puppeteer connection failed:', err);
  // });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }

})

