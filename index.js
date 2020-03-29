const {PORT, MONGODB_URI} = require('./config/index.js');
const server = require('./server/index.js');
const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then( () => {
  server.listen(PORT, error => {
    if(error){
      fastify.log.error(error);
      process.exit(1);
      return;
    }
    server.log.info(`Fastify Api running on port :${PORT}`)
  });
})
.catch(console.log);

