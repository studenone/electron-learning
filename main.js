// 主进程，管理生命周期，运行在node运行时
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = config => {
  if (config) {
    const win = new BrowserWindow({
      ...config,
      webPreferences: {
        preload: path.join(__dirname, './preload.js') //指定预加载脚本，添加到渲染器中
      }
    })
    win.loadFile('./index.html') //读取html，创建窗口
  }
}

app.whenReady().then(() => {
  createWindow({
    width: 800,
    height: 600
  })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow({
        width: 800,
        height: 600
      })
    }
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit() //窗口关闭，退出程序
    }
  })
})
