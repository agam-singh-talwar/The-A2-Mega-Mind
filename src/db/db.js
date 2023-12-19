const fs = require('node:fs/promises');

async function load(name) {
    return fs.readFile(`./saves/${name}.json`, { encoding: 'utf8' });
}

async function save(name, json) {
    await fs.writeFile(`./saves/${name}.json`, json);
}

module.exports = { load, save };