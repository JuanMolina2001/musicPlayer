const { Menu, dialog } = require('electron')
const { getFiles} = require('./utils')
const options = {
    title: 'Selecciona un archivo',
    filters: [
        { name: 'Audio', extensions: ['mp3', 'wav', 'ogg'] }
    ],
    properties: ['openFile', 'multiSelections']
}


const isMac = process.platform === 'darwin'
function setMainMenu(win) {
    const template = [

        {
            label: 'File',
            submenu: [
                {
                    label: 'Abrir', click : () => {
                        dialog.showOpenDialog(options)
                            .then(result => {
                                if (result.canceled) {
                                    return
                                }
                                getFiles(result.filePaths).then((data) => {
                                    win.webContents.send('files',data )
                                }).catch((err) => {
                                    console.error(err)
                                })
                            })

                    }
                },
                {
                    label: 'Seleccionar carpeta', click: () => {
                        dialog.showOpenDialog({ properties: ['openDirectory'] })
                            .then(result => {
                                
                            })

                    }
                },
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },


    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
module.exports = setMainMenu