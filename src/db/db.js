const fs = require("node:fs");

async function load(name) {
    return fs.readFile(`./saves/${name}.json`, err => { console.warn(err); });
}

async function save(name, json) {
    fs.writeFile(`./saves/${name}.json`, json, err => { console.warn(err) });
}

module.exports = { load, save };