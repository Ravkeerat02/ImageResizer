const { app, BrowserWindow } = require("electron");
// uses Chrmium
const path = require("path");
//  check for OS
const isMac = process.platform === "darwin";
// dev
const isDev = process.env.NODE_ENV !== "production";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resize",
    width: isDev ? "1000" : "500",
    height: 600,
  });

  // open dev tool if in dev mdoe
  if (isDev) {
  }
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
