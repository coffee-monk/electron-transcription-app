const electron = require("electron")

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

// for window transparency to work
app.disableHardwareAcceleration()

// SECURITY ISSUE for nodeIntegration + contextIsolation
app.on("ready", () => {
  setTimeout(() => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    mainWindow.loadURL(`file://${__dirname}/views/index.html`)
  }, 200)

  ipcMain.on("room:submit", (e, room) => {
    console.log(room)

    mainWindow.loadURL(`file://${__dirname}/views/output.html`)

    setTimeout(() => {
      mainWindow.webContents.send("room:data", room)
    }, 200)
  })
})
