const uuid = require('uuid').v4;

class Feed {
    //feeds identify
    constructor(_core, options) {
        this._core = _core;
        this.options = options;
        this._id = uuid();
    }

    start(cb = {}) {

        //start

        cb(this);
    }

    stop(cb = {}) {
        //stop feed and call cb
        cb(true);
    }
}


module.exports = Feed;