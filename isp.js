const Core = require('./core/classes/core');


const _core = new Core();
_core.startAPIservice();
_core.FeedManager.start('binance', (fed) => {
    // console.log('started')
    //_core.FeedManager.stop(fed._id)
});

//prevent stop
setInterval(() => {
}, 1000)