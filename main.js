const { app, BrowserWindow } = require('electron');
const server = require('http').createServer();
    const io = require('socket.io')(server);
    const request = require('request');
    //const GoogleCharts = require("google-charts");
     //Load the charts library with a callback

    
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })
  
    // and load the index.html of the app.
    win.loadFile('app/index.html')
  
    // Open the DevTools.
    win.webContents.openDevTools()

    
    

    io.on('connection', function (socket) {
      console.log('im here');
      /*
        request.get('https://blankdib.com/api/products',function (response){
          console-log('trhing to retrieve data');
        });*/
    });


    request('https://www.w3schools.com/js/json_demo_db.php?x={%22table%22:%22customers%22,%22limit%22:10}', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });

    server.listen(3000, function(){
      console.log('listening on *:3000');
    });
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.