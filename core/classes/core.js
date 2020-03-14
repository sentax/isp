const ConfigManager = require('./configManager');
const FeedManager = require('./feedManager/feedManager');
const APIService = require('../api/api');

class Core {
    constructor() {
        this.ConfigManager = new ConfigManager();
        this.FeedManager = new FeedManager(this);
        APIService.fastify.decorate('ISP', this);

    }

    startAPIservice() {
        if (this.ConfigManager.configs.api.enabled===true){
            APIService.fastify.listen(this.ConfigManager.configs.api.port, '0.0.0.0');
        }
    }



}


module.exports = Core;