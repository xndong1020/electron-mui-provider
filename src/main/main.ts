import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import * as url from "url";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.CURRENT_STAGE}` });

let mainWindow: BrowserWindow | null;

const mainMenu: Menu = Menu.buildFromTemplate([
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { role: "copy" },
      { role: "paste" },
    ],
  },
  {
    label: "Home",
    submenu: [
      {
        label: "Home",
        click: () => mainWindow?.webContents.send("update-route", "/"),
      },
    ],
  },
  {
    label: "Auth",
    submenu: [
      {
        label: "Login",
        click: () =>
          mainWindow?.webContents.send("update-route", "/auth/login"),
      },
    ],
  },
  {
    label: "Report",
    submenu: [
      {
        label: "Price",
        click: () =>
          mainWindow?.webContents.send("update-route", "/report/price"),
      },
    ],
  },
  {
    label: "Provider Management",
    submenu: [
      {
        label: "Create New Provider Bulk",
        click: () =>
          mainWindow?.webContents.send("update-route", "/providers/bulk"),
      },
      {
        label: "Delete Provider",
        click: () =>
          mainWindow?.webContents.send("update-route", "/providers/delete"),
      },
    ],
  },
  {
    label: "User Management",
    submenu: [
      {
        label: "Create New User Bulk",
        click: () =>
          mainWindow?.webContents.send("update-route", "/users/bulk"),
      },
      {
        label: "Delete User",
        click: () =>
          mainWindow?.webContents.send("update-route", "/users/delete"),
      },
    ],
  },
  {
    label: "Course Management",
    submenu: [
      {
        label: "Delete User",
        click: () =>
          mainWindow?.webContents.send("update-route", "/courses/delete"),
      },
    ],
  },
  {
    label: "Utils",
    submenu: [{ role: "toggleDevTools" }, { role: "togglefullscreen" }],
  },
]);

function loadUrl(mainWindow: BrowserWindow) {
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:4000");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
}

// create renderer process
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: "#f2f2f2",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV !== "production",
    },
  });

  loadUrl(mainWindow);

  // for debugging
  if (process.env.NODE_ENV !== "production") {
    mainWindow.webContents.openDevTools();
  }

  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  mainWindow?.webContents.send("update-route", "/");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
