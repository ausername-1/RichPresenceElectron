const { app, BrowserWindow, Tray, Menu, shell, Notification } = require('electron');
const path = require('path');
const RichPresence = require("rich-presence-builder")
const express = require('express')
const server = express();

const iconPath = path.join(__dirname, '../icons/crownonly.ico');


let appIcon = null;
let win = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let crown = "👑"
function createSystemTray() {
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: `${crown} Rich Presence Electron`,
    click: function({[
        shell.openPath('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
    },
      {
      label: 'Star us on Github!',
      click: function() 
         shell.openPath('https://github.com/DiscordAddons/RichPresenceElectron')
      }
    },
    { label: 'Quit',
      type: 'normal',
      click: () =>  app.quit()
    }
  ]);
  appIcon.setToolTip('Rich Presence Electron');
  appIcon.setContextMenu(contextMenu);
}


app.on('ready', function() {
 createWindow();
 createSystemTray(); 
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

server.use(express.json())

//If you plan to change the Large Image text or Small Image Text please be sure to credit me!
server.post('/api/makerpc', (req, res) => {
 res.send('Created RPC')
 const { clientid, largeimage, smallimage, state, details} = req.body;
 if(state !== "" || details !== "") {
  new RichPresence({ clientID: clientid })
  .setLargeImage(largeimage, "Made by Rich Presence Electron")
  .setSmallImage(smallimage, "https://github.com/DiscordAddons/RichPresenceElectron")
  .setState(state)
  .setDetails(details)
  .go()

  const notif = new Notification({
    icon: iconPath,
    title: 'Started Rich Presence!',
    subtitle: 'RichPresence',
    body: 'Rich Presence has been started!',
  });

  notif.show();

 } else {
  new RichPresence({ clientID: clientid })
  .setLargeImage(largeimage, "Made by Rich Presence Electron")
  .setSmallImage(smallimage, "https://github.com/DiscordAddons/RichPresenceElectron")
  .go()

  const notif = new Notification({
    icon: iconPath,
    title: 'Started Rich Presence!',
    subtitle: 'RichPresence',
    body: 'Rich Presence has been started!',
  });

  notif.show()
 } 
})

server.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
