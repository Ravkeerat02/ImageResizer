const { app, BrowserWindow } = require("electron");
// uses Chrmium
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    titile: "Image Resize",
    width: 500,
    height: 600,
  });
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createMainWindow();
});
