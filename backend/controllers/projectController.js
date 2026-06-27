const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {

    try {

        const {
            name,
            description,
            owner
        } = req.body;

        const project =
        await Project.create({

            name,
            description,
            owner

        });

        res.status(201).json({

            message:
            "Project Created Successfully",

            project

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};

// Get All Projects
const getProjects = async (req, res) => {

    try {

        const projects =
        await Project.find()
        .populate(
            "owner",
            "name email"
        );

        res.status(200).json(
            projects
        );

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};

// Get Single Project
const getProjectById = async (req, res) => {

    try {

        const project =
        await Project.findById(
            req.params.id
        ).populate(
            "owner",
            "name email"
        );

        if(!project){

            return res.status(404).json({

                message:
                "Project Not Found"

            });

        }

        res.status(200).json(
            project
        );

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};

// Update Project
const updateProject = async (req, res) => {

    try {

        const project =
        await Project.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );

        res.status(200).json({

            message:
            "Project Updated",

            project

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};

// Delete Project
const deleteProject = async (req, res) => {

    try {

        await Project.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            message:
            "Project Deleted"

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

};

module.exports = {

    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject

};