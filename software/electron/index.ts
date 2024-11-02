const { app, BrowserWindow } = require("electron");
const path = require("path");
const backend = require('./../backend/server')

/**
 * Create the application window
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load HTML entry point
  win.loadFile("build/src/vite/index.html");

  // Maximize window
  win.maximize()

  // Remove menu bar
  win.removeMenu()
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }

  // Close the expressjs backend server on application termination
  backend.close(() => {
    process.exit(0)
  })
});