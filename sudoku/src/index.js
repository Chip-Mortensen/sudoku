const electron = require("electron");
const { app, BrowserWindow, ipcMain, webContents } = electron;
const path          	           = require('path')
const url           	           = require('url')
 // Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let contents
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async function () {
	await createWindow();
  let timeout = null;
  mainWindow.on("resize", function() {
    clearTimeout(timeout);
    timeout = setTimeout(resize, 300);
  });
  function resize() {
    var size = mainWindow.getSize();
    var width = parseInt(size[0]);
    var height = width * (500/960);
    var scale = width / 960;
    mainWindow.webContents.send('resize', scale);
    width = parseInt(width);
    height = parseInt(height + 30);
    mainWindow.setSize(width, height);
    clearTimeout(timeout);
  }
 }) 
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
	width : 960,
	height: 530,
	frame: true,
	webPreferences: {
        nodeIntegration: true,
    	webSecurity: false,
    	plugins: true,
        contextIsolation: false
	}
});
 // Open the DevTools.
  // mainWindow.webContents.openDevTools()
 
 // and load the index.html of the app.
  mainWindow.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
  }));
// Emitted when the window is closed.
  mainWindow.on('closed', function () {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	mainWindow = null
  })
}
 app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
	createWindow()
  }
})
  // Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
	app.quit()
  }
})