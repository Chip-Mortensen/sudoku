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
app.on('ready', function () {
	createWindow();
    contents = mainWindow.webContents;
    console.log(contents);
 }) 
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
	width : 1024,
	height: 600,
	frame: true,
	webPreferences: {
        nodeIntegration: true,
    	webSecurity: false,
    	plugins: true,
        contextIsolation: false
	}
});
 // Open the DevTools.
  mainWindow.webContents.openDevTools()
 
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

// const generateBoardHTML = () => {
//     mainWindow.webContents.on('did-finish-load', ()=>{
//         let code = `const board = document.querySelector('.board');`;
//         mainWindow.webContents.executeJavaScript(code);
//     });
//     for (let x = 0; x < 9; x++) {
//         for (let y = 0; y < 9; y++) {
//             mainWindow.webContents.on('did-finish-load', ()=>{
//                 let code = `let node = document.createElement('input');`;
//                 mainWindow.webContents.executeJavaScript(code);
//             });
//             node.setAttribute('maxlength', '1');
//             node.className += 'node ';
//             node.className += `c${y} `;
//             node.className += `r${x} `;
//             if (x < 3) {
//                 if (y < 3) {
//                     node.className += 's1';
//                 } else if (y < 6) {
//                     node.className += 's2';
//                 } else {
//                     node.className += 's3';
//                 }
//             } else if (x < 6) {
//                 if (y < 3) {
//                     node.className += 's4';
//                 } else if (y < 6) {
//                     node.className += 's5';
//                 } else {
//                     node.className += 's6';
//                 }
//             } else if (x < 9) {
//                 if (y < 3) {
//                     node.className += 's7';
//                 } else if (y < 6) {
//                     node.className += 's8';
//                 } else {
//                     node.className += 's9';
//                 }
//             }
//             node.className += ` n${(x * 9) + y}`;
            
//             node.addEventListener('dblclick',function(){node.value=''});
//             node.addEventListener('keypress',
//             function(key) {
//                 if(key.key == '1' || key.key == '2' || key.key == '3' || key.key == '4' || key.key == '5' || key.key == '6' || key.key == '7' || key.key == '8' || key.key == '9') {
//                     node.value = key.key;
//                     validateBoard(this);
//                 }
//             });
//             board.appendChild(node);
//         }
//     }
// }

// generateBoardHTML();