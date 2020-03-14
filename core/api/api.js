const
    fastify = require(`fastify`)({logger: false}),
    AutoLoad = require('fastify-autoload'),
    path = require('path'),
    multer = require('fastify-multer'),
    io = require('socket.io')(fastify.server);


fastify.decorate(`bodyParser`, (entity, selects) => {
    let res = {};
    for (let i of selects) {
        if (typeof entity[i] !== 'undefined')
            res[i] = entity[i]
    }
    return res
});
fastify.decorate(`socket`, io);


fastify.register(multer.contentParser);
fastify.register(require('fastify-formbody'));
fastify.register(require('fastify-cors'), {origin: `*`});

fastify.register(AutoLoad, {
    dir: path.join(__dirname, './routes'),
    options: {prefix: '/api/v2'}

});


module.exports = {
    fastify
};