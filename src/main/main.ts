/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const fs = require('fs');
import { Database } from 'sqlite3';

let db: Database;


class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function connectToDatabase() {
  db = new Database('MyDatabase.db', (err) => {
      if (err) {
          console.error(err.message);
          throw err;
      }
      console.log('Connected to the SQLite database.');
  });
}


let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});
ipcMain.on('save-json', (event, args) => {
  console.log('Workings2');
  const { data, filename } = args;
  const baseDirectory = 'C:\\Users\\ESFORGE-03\\Desktop';
  const filePath = path.join(baseDirectory, filename);
    
  // const filePath = path.join(app.getPath('documents'), filename);
  console.log("filename: ",filePath);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
    if (err) {
      // Send error back to renderer process
      console.log("Failed: ",err);
      event.reply('save-json-response', { success: false, message: err.message });
    } else {
      // Send success message back to renderer process
      console.log("SAved");
      event.reply('save-json-response', { success: true, message: 'File saved successfully.' });
    }
  });
});

ipcMain.on('add-student', async (event, studentData) => {
  const { student, pNo, rank, unit } = studentData;


  const insertQuery = `INSERT INTO students (Name, PA_No, rank, unit) VALUES (?, ?, ?, ?)`;
  
  db.run(insertQuery, [student, pNo, rank, unit], (err) => {
      if (err) {
          // Handle error
          console.error(err.message);
          event.reply('add-student-response', { success: false, message: err.message });
          return;
      }
      // Send success message
      event.reply('add-student-response', { success: true, message: 'Student added successfully.' });
  });
});

ipcMain.on('add-instructor', async (event, instructorData) => {
  const { instructor, pNo, rank, unit } = instructorData;


  const insertQuery = `INSERT INTO instructors (Name, PA_No, rank, unit) VALUES (?, ?, ?, ?)`;

  db.run(insertQuery, [instructor, pNo, rank, unit], (err) => {
      if (err) {
          // Handle error
          console.error(err.message);
          event.reply('add-instructor-response', { success: false, message: err.message });
          return;
      }
      // Send success message
      event.reply('add-instructor-response', { success: true, message: 'Instructor added successfully.' });
  });
});
// Fetch Students
ipcMain.on('fetch-students', async (event) => {
  db.all("SELECT Name FROM students", [], (err, rows) => {
      if (err) {
          event.reply('fetch-students-response', { success: false, message: err.message });
      } else {
          event.reply('fetch-students-response', { success: true, data: rows.map(row => row.Name) });
      }
  });
});

// Fetch Instructors
ipcMain.on('fetch-instructors', async (event) => {
  db.all("SELECT Name FROM instructors", [], (err, rows) => {
      if (err) {
          event.reply('fetch-instructors-response', { success: false, message: err.message });
      } else {
          event.reply('fetch-instructors-response', { success: true, data: rows.map(row => row.Name) });
      }
  });
});

ipcMain.on('get-maps', async (event) => {
  db.all("SELECT Name, Area FROM Maps", [], (err, rows) => {
      if (err) {
          event.reply('get-maps-response', { success: false, message: err.message });
      } else {
          event.reply('get-maps-response', { success: true, data: rows });
      }
  });
});

ipcMain.on('get-map-details', async (event, mapName) => {
  db.get("SELECT * FROM Maps WHERE Name = ?", [mapName], (err, row) => {
      if (err) {
          event.reply('get-map-details-response', { success: false, message: err.message });
      } else {
          event.reply('get-map-details-response', { success: true, data: row });
      }
  });
});

ipcMain.on('save-map-data', async (event, mapData) => {
  // Calculate number of enemies for the database
  const numberOfEnemies = Object.values(mapData.enemy).reduce((acc, curr) => acc + curr.length, 0);

  // Define the JSON file path
  const jsonFilePath = path.join('C:\\Users\\ESFORGE-03\\Desktop\\Instructor\\TSM-SIMULATOR\\assets\\maps', `${mapData.name}.json`);

  // Prepare the data for the JSON file
  const jsonData = {
    ...mapData,
    enemy: mapData.enemy
    // Include other data needed for the JSON file
  };

  // Write map data to the JSON file
  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error(writeErr);
      event.reply('save-map-data-response', { success: false, message: writeErr.message });
      return;
    }

    // Save data to SQLite database (excluding enemy object)
    const insertQuery = `INSERT INTO Maps (Location, Name, Area, NoOfenemy, time, Terrain) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(insertQuery, [jsonFilePath, mapData.name, mapData.mapArea, numberOfEnemies, mapData.exerciseTime, mapData.terrain], (err) => {
      if (err) {
        console.error(err.message);
        event.reply('save-map-data-response', { success: false, message: err.message });
      } else {
        event.reply('save-map-data-response', { success: true, message: 'Data saved successfully.' });
      }
    });
  });
});

ipcMain.on('delete-map', async (event, mapName) => {
  db.run("DELETE FROM Maps WHERE Name = ?", [mapName], (err) => {
    if (err) {
      console.error(err.message);
      event.reply('delete-map-response', { success: false, message: err.message });
    } else {
      event.reply('delete-map-response', { success: true, message: 'Map deleted successfully.' });
      // Optionally, send a refreshed list of maps back to the renderer
    }
  });
});


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }
  connectToDatabase();
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      // preload: app.isPackaged
      //   ? path.join(__dirname, 'preload.js')
      //   : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
