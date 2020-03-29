const fastify = require('fastify');
const server = fastify({logger:true});
const routes = require('fastify-routes');
const cors = require('fastify-cors');
const formBody = require('fastify-formbody');
const fileUpload = require('fastify-file-upload');
const helmet = require('fastify-helmet');

server.register(cors);
server.register(routes);
server.register(formBody);
server.register(helmet);
server.register(fileUpload,{
    limits:{
        fileSize: 50 * 1024 * 1024
    }
});


require('../routes/index.js')(server);

module.exports = server;