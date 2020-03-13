const uuid = require('uuid').v4;
const {spawn} = require('child_process')
    , path = require('path')

class Feed {
    //feeds identify
    constructor(_core, options) {
        this._core = _core;
        this.options = options;
        this.inited = false;
        this._id = uuid();
    }

    start(cb = {}) {
        this.process = spawn('node', [path.join(__dirname, `../../../${this.options.path}`)]);

        this.process.stdout.on('data', (data) => {
            data = data.toString();
            if (data[0] !== '|' && data[1] !== '~')
                return false;
            const json = JSON.parse(data.substr(2));
            console.log(json)
        });
        this.process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        this.process.on('close', (code) => {
            console.log('close')
        });

        //start
        this.inited = true;
        cb(this);
    }

    stop(cb = {}) {
        //stop feed and call cb
        cb(true);
    }
}


module.exports = Feed;