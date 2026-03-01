const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const ShortProjectsSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    shortDescription: { 
        type: String, 
        required: [true, 'Short description is required'] 
    },
    description: { 
        type: String, 
        required: [true, 'Long description is required'] 
    },
    image: { 
        type: String, 
        required: [true, 'Image URL is required'] 
    },
    techs: { 
        type: [String], 
        default: [] 
    },
    features: { 
        type: [String], 
        default: [] 
    },
    projectLink: { 
        type: String, 
        default: '' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const ProjectsModel = mongoose.model('Project', projectSchema);


router.get('/', async (req, res) => {
    try {
        const allProjects = await ProjectsModel.find().sort({ createdAt: -1 });
        res.status(200).json(allProjects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects", error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, shortDescription, description, image, techs, features, projectLink } = req.body;
        
        const newProject = await ProjectsModel.create({ 
            title, 
            shortDescription, 
            description, 
            image, 
            techs, 
            features, 
            projectLink 
        });
        
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: "Error creating project", error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProject = await ProjectsModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedProject) return res.status(404).json({ message: "Project not found" });
        
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: "Error updating project", error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProject = await ProjectsModel.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await ProjectsModel.findByIdAndDelete(id);
        
        if (!deletedProject) return res.status(404).json({ message: "Project already deleted or not found" });
        
        res.status(200).json({ message: "Project deleted successfully", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;