const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            project,
            assignedTo,
            priority,
            dueDate
        } = req.body;

        const task = await Task.create({

            title,
            description,
            project,
            assignedTo,
            priority,
            dueDate

        });

        res.status(201).json({

            message: "Task Created Successfully",
            task

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Tasks By Project
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            project: req.params.projectId

        })
        .populate("assignedTo", "name email");

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Get My Tasks
const getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            assignedTo: req.params.userId

        })

        .populate("project", "name")

        .populate("assignedTo", "name email");

        res.status(200).json(tasks);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

// Update Task
const updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        res.status(200).json({

            message: "Task Updated",
            task

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Task
const deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            message: "Task Deleted"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createTask,
    getTasks,
    getMyTasks,
    updateTask,
    deleteTask

};