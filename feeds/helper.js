const log = (event, message) => {
    const json = {
        e: event,
        m: message
    };
    console.log('|~' + JSON.stringify(json))
};


module.exports = {
    log
};