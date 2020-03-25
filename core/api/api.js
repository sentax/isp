const
    fastify = require(`fastify`)({logger: false}),
    AutoLoad = require('fastify-autoload'),
    path = require('path'),
    multer = require('fastify-multer'),
    io = require('socket.io')(fastify.server),
    fs = require('fs');

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

//create /public/ static file router
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../../ui/public'),
    prefix: '/public/', // optional: default '/'
});

//create / route streamer for isp.html file
fastify.get('/', function (req, reply) {
    const streamer = fs.createReadStream(path.join(__dirname, `../../ui/isp.html`));
    reply.type('text/html').send(streamer) // streaming  directly
});

fastify.register(AutoLoad, {
    dir: path.join(__dirname, './routes'),
    options: {prefix: '/api/v2'}

});


module.exports = {
    fastify
};