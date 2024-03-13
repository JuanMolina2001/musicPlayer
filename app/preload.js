const {contextBridge,  ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electron', {
    sendFiles: (callback) => {
        ipcRenderer.on('files', callback)
    },
    savePlayList: (playlist) => {
        console.log('sending playlist to main process')
        ipcRenderer.send('add-playlist', playlist)
    },
    getPlayList: (callback) => {
        ipcRenderer.on('response-get-playlist', callback)
    },
    getPlaylists: (callback) => {
        console.log('getting playlists from main process')
        ipcRenderer.send('get-playlists')
        ipcRenderer.on('response-get-playlists', callback)
    }
})