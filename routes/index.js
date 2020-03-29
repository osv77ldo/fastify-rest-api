const { TaskController } = require('../controllers/index.js');
const middlewares = require('../middlewares/index.js');

module.exports = server => {
    server.get('/tasks', TaskController.list);
    server.post('/tasks', TaskController.create);
    server.get('/tasks/:id', { preValidation: middlewares.isValidDomain }, TaskController.read);
    server.put('/tasks/:id', { preValidation: middlewares.isValidDomain }, TaskController.update);
    server.put('/tasks/:id/title', { preValidation: middlewares.isValidDomain }, TaskController.updateTitle);
    server.put('/tasks/:id/completed', { preValidation: middlewares.isValidDomain }, TaskController.updateCompleted);
    server.put('/tasks/:id/images', { preValidation: middlewares.isValidDomain }, TaskController.updateImages);
    server.delete('/tasks/:id', { preValidation: middlewares.isValidDomain }, TaskController.delete);
};