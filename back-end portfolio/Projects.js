const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('./upload');

const ProjectSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  description: String,
  image: String,
  techs: [String],
  features: [String],
  githubLink: String,
  liveDemo: String
}, { timestamps: true });

const ProjectsModel = mongoose.model('Project', ProjectSchema);

router.get('/', async (req, res) => {
    try {
        const all = await ProjectsModel.find().sort({ createdAt: -1 });
        res.json(all);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            image: req.file ? req.file.filename : "",
            techs: req.body.techs ? req.body.techs.split(',').map(t => t.trim()) : [],
            features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : []
        };
        const newProject = await ProjectsModel.create(projectData);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.body.techs) updateData.techs = req.body.techs.split(',').map(t => t.trim());
        if (req.body.features) updateData.features = req.body.features.split(',').map(f => f.trim());

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedProject = await ProjectsModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true } 
        );

        if (!updatedProject) return res.status(404).json({ message: "Project not found" });
        
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await ProjectsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;