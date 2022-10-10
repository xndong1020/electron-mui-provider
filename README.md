### Section 2: Developing with Electron

#### 4. App Structure

Electron operates with 2 types of processes.

1. `Main process`. Which is a Node.js process.
2. The `Main process` will then create an instance of the `Renderer Process`, which is a `Chromium` browser.

### Section 3: Main Process API

#### 20. Menu & MenuItem

```ts
import { app, BrowserWindow, Menu, MenuItem } from "electron";
import * as path from "path";
import * as url from "url";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.CURRENT_STAGE}` });

let mainWindow: BrowserWindow | null;

let mainMenu: Menu = new Menu();

const AuthMenuItem = new MenuItem({
  label: "Auth",
  submenu: [{ label: "Login" }],
});

const providerMenuItem = new MenuItem({
  label: "Provider",
  submenu: [
    { label: "Create a new provider" },
    { label: "Create new providers bulk" },
    { label: "Delete a new provider" },
  ],
});

const UserMenuItem = new MenuItem({
  label: "User",
  submenu: [
    { label: "Create a new User" },
    { label: "Create new Users bulk" },
    { label: "Delete a new provider" },
  ],
});

mainMenu.append(AuthMenuItem);
mainMenu.append(providerMenuItem);
mainMenu.append(UserMenuItem);

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
app.on("ready", createWindow);

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
```

Or, these is a shortcut

```ts

```