const Task = require('../models/Task');
const List = require('../models/List');

module.exports = (() => {
    return {
        createList,
        createTask,
        getAllLists,
        getAllTasks,
        getListByID,
        getTaskByID,
        deleteList,
        deleteTask
    }

    function createList(req, res) {
        const {listName} = req.body;

        const newList = new List({
            listName
        });

        newList.save((err) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                res.send({
                    status: 200,
                    payload: {
                        message: "Success"
                    }
                });
            }
        });
    }

    function createTask(req, res) {
        const {listID} = req.params;
        const {title} = req.body;

        List.findOne({_id: listID}, (err, list) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                const newTask = new Task({
                    title,
                    taskID: `task-${list.elements.length + 1}`
                });

                list.elements.push(newTask);
                list.save();
            }
        });
        res.send({
            status: 200,
            payload: {
                message: "success"
            }
        });
    }

    function getAllLists(req, res) {
        List.find((err, lists) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                res.send({
                    status: 200,
                    payload: {
                        message: "Success",
                        data: lists
                    }
                });
            }
        });
    }

    function getAllTasks(req, res) {
        const {listID} = req.params.listID;

        List.findOne({_id: listID}, (err, list) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                res.send({
                    status: 200,
                    payload: {
                        message: "Success",
                        data: list.elements
                    }
                });
            }
        });
    }

    function getListByID(req, res) {
        const {listID} = req.params;

        List.findOne({_id: listID}, (err, list) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                res.send({
                    status: 200,
                    payload: {
                        message: "Success",
                        data: list
                    }
                });
            }
        });
    }

    function getTaskByID(req, res) {
        const {listID, taskID} = req.params;

        List.findOne({
            _id: listID
        }, (err, list) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                const task = list.elements.filter((element) => {return element._id == taskID})

                res.send({
                    status: 200,
                    payload: {
                        message: "Success",
                        data: task
                    }
                });
            }
        });
    }

    function deleteList(req, res) {
        const {listID} = req.params;

        List.remove({_id: listID}, (err) => {
            if (err) {
                res.send({
                    status: 500,
                    payload: {
                        message: err
                    }
                });
            } else {
                res.send({
                    status: 200,
                    payload: {
                        message: "Success"
                    }
                });
            }
        });
    }

    async function deleteTask(req, res) {
        const {listID, taskID} = req.params;

        const list = await List.findOne({
            _id: listID
        });
               
        await list.elements.pull({_id: taskID});
        await list.save();

        res.send({
            status: 200,
            payload: {
                message: "Success"
            }
        });
    } 
})()