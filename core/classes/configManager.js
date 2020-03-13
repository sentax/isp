const fs = require('fs'),
    path = require('path'),
    config = require('../../config');

class ConfigManager {
    constructor() {
        this.configs = config;
    }

    save(payload) {
        return fs.writeFileSync('../../config.json', JSON.stringify(payload));
    }
}


module.exports = ConfigManager;