async function routes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        return {API: 'Infinite Synapses, Welcome to API V2.0.0 ;)'}
    })
}

module.exports = routes;
