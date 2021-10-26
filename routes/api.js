const controller = require('./controller');

module.exports = function(router){
    router.get('/lists', controller.getAllLists);

    router.get('/lists/:listID', controller.getListByID);

    router.get('/lists/:listID/tasks', controller.getAllTasks);

    router.get('/lists/:listID/tasks/:taskID', controller.getTaskByID);


    router.post('/lists', controller.createList);

    router.post('/lists/:listID/tasks', controller.createTask);


    router.delete('/lists/:listID', controller.deleteList);

    router.delete('/lists/:listID/tasks/:taskID', controller.deleteTask);

    return router;

}