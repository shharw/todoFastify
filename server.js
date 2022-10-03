const fastify = require('fastify')({
    logger: true
})
const path = require('path')
const mongoose = require('mongoose')

fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'static'),
})
fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    },
})
fastify.register(require('./router'))

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://shharw:wBn1ODGChhoAP2jz@notes.qp1rnlc.mongodb.net/?retryWrites=true&w=majority');
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
