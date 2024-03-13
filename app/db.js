const fs = require('fs');
const {ipcMain} = require('electron')
const currentData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
function AdminPlayList(){
ipcMain.on('add-playlist', (event, newPlaylist) => {
    console.log('Agregando lista de reproducción:');
    try {
        newPlaylist.id = currentData.playlists.length+1;
        currentData.playlists.push(newPlaylist);
        fs.writeFileSync('data.json', JSON.stringify(currentData, null, 2));
        console.log('Lista de reproducción agregada con éxito.');
    } catch (error) {
        console.error('Error al agregar lista de reproducción:', error.message);
    }
})

ipcMain.on('remove-playlist', (event, id) => {
    try {
        currentData.playlists.splice(id, 1);
        fs.writeFileSync('data.json', JSON.stringify(currentData, null, 2));
        console.log('Lista de reproducción eliminada con éxito.');
    } catch (error) {
        console.error('Error al eliminar lista de reproducción:', error.message);
    }
})
ipcMain.on('get-playlist', (event, id) => {
    const playlist = currentData.playlists[id];
    event.sender.send('response-get-playlist', playlist);
})
ipcMain.on('remove-all-playlist', (event) => {
    try {
        currentData.playlists = [];
        fs.writeFileSync('data.json', JSON.stringify(currentData, null, 2));
        console.log('Todas las listas de reproducción eliminadas con éxito.');
    } catch (error) {
        console.error('Error al eliminar todas las listas de reproducción:', error.message);
    }
})
ipcMain.on('get-playlists', (event) => {
    event.sender.send('response-get-playlists', currentData.playlists);
})
}
function config(){}
module.exports = {AdminPlayList, config}