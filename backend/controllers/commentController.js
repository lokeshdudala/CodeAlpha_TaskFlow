const Comment = require("../models/Comment");

// Add Comment
const createComment = async (req, res) => {

    try {

        const { task, user, message } = req.body;

        const comment = await Comment.create({
            task,
            user,
            message
        });

        res.status(201).json({
            message: "Comment Added",
            comment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Comments
const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({

            task: req.params.taskId

        }).populate(
            "user",
            "name"
        );

        res.status(200).json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createComment,
    getComments

};