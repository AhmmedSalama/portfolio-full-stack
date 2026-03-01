const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('./upload');

const SkillSchema = new mongoose.Schema({
    name: String,
    icon: String 
});

const SkillsModel = mongoose.model('Skills', SkillSchema);


router.get('/', async (req, res) => {
    try {
        const skills = await SkillsModel.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('icon'), async (req, res) => {
    try {
        const skillData = {
            name: req.body.name,
            icon: req.file ? req.file.filename : "" 
        };
        const newSkill = await SkillsModel.create(skillData);
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/:id", upload.single('icon'), async (req, res) => {
    try {
        const skillid = req.params.id;
        let updatedData = { ...req.body };

        if (req.file) {
            updatedData.icon = req.file.filename;
        }

        const updated = await SkillsModel.findByIdAndUpdate(skillid, updatedData, { new: true });
        res.json({ message: "Updated successfully", data: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedSkill = await SkillsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully", data: deletedSkill });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;