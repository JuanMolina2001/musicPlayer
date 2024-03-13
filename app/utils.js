const path = require('path');
const fs = require('fs').promises;

async function getFiles(paths) {
    const promises = paths.map(async (ruta) => {
        const name = path.basename(ruta);
        try {
            const data = await fs.readFile(ruta);
            return {data: data, name: name, path : ruta};
        } catch (err) {
            throw err;
        }
    });

    try {
        const results = await Promise.all(promises);
        return results;
    } catch (err) {
        throw err;
    }
}

exports.getFiles = getFiles
