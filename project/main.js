const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "production";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resize",
    width: isDev ? 1000 : 500,
    height: 600,
  });

  if (isDev) {
    // Open DevTools if in development mode
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

// create about window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About",
    width: 300,
    height: 600,
  });

  aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

app.whenReady().then(() => {
  createMainWindow();

  const menuTemplate = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: "About",
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
    {
      role: "fileMenu",
    },
    // windows menu
    ...(!isMac
      ? [
          {
            label: "Help",
            submenu: [
              {
                label: "About",
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
  ];

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

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
