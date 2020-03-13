const ConfigManager = require('./configManager');
const FeedManager = require('./feedManager/feedManager');

class Core {
    constructor() {
        this.ConfigManager = new ConfigManager();
        this.FeedManager = new FeedManager(this);
    }

}


module.exports = Core;