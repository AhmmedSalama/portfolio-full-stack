const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('./upload'); 

const aboutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    job: { type: String, required: true },
    descJob: String,
    image: String,
    skills: [String]
}, { timestamps: true });

const AboutModel =  mongoose.model('About', aboutSchema);

router.get('/', async (req, res) => {
    try {
        const data = await AboutModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const aboutData = {
            ...req.body,
            image: req.file ? req.file.filename : "",
            skills: req.body.skills ? req.body.skills.split(',').map(s => s.trim()) : []
        };
        const myAbout = await AboutModel.create(aboutData);
        res.status(201).json(myAbout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        if (req.body.skills) {
            updateData.skills = req.body.skills.split(',').map(s => s.trim());
        }

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updated = await AboutModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;