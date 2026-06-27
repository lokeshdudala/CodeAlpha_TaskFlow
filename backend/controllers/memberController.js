const User = require("../models/User");
const Project = require("../models/Project");

// Get all users
const getMembers = async (req, res) => {

    try {

        const { projectId } = req.query;

        const users = await User.find().select("name email");

        let project = null;

        if(projectId){

            project = await Project.findById(projectId);

        }

        const result = users.map(user=>{

            const added =
            project
            ? project.members.some(
                member =>
                member.toString() === user._id.toString()
              )
            : false;

            return{

                ...user.toObject(),

                added

            };

        });

        res.json(result);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

// Add member to project
const addMember = async (req, res) => {

    try {

        const { projectId, userId } = req.body;

        const project = await Project.findById(projectId);

        if (!project.members.includes(userId)) {

            project.members.push(userId);

            await project.save();

        }

        res.json({
            message: "Member Added"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    getMembers,
    addMember

};