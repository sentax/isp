const Feed = require('./feed');

class FeedManager {
    constructor(_core) {
        this._core = _core;
        this.feeds = [];
    }

    start(name, cb = {}) {
        //start feed and call cb
        // const _feed = new Feed(name);
        this._core.ConfigManager.configs.feeds.map((feed) => {
            if (feed.id === name) {
                const _feed = new Feed(this._core, feed);
                _feed.start((_feedObject) => {
                    this.feeds.push(_feedObject);
                    cb(_feedObject);
                })
            }
        })

    }

    startAll(cb = {}) {
        this._core.ConfigManager.configs.feeds.map((feed, index) => {
            const _feed = new Feed(this._core, feed);
            _feed.start((_feedObject) => {
                this.feeds.push(_feedObject)
            });
            if (index >= this._core.ConfigManager.configs.feeds.length - 1)
                cb(true)
        })
    }

    stop(feedId, cb = {}) {
        //stop feed and call cb
        this.feeds.map((feed) => {
            if (feed._id === feedId) {
                feed.stop((result) => {
                    if (result === true) {
                        feed = null;
                    }
                })
            }
        })
    }
}


module.exports = FeedManager;