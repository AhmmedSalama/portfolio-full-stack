const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const footerSchema = new mongoose.Schema({
    aboutText: String,
    email: String,
    phone: String,
    freelanceStatus: String,
    linkedin: String,
    github: String,
    facebook: String,
    copyrightText: String
});

const FooterModel = mongoose.model('Footer', footerSchema);

router.get('/', async (req, res) => {
    try {
        const data = await FooterModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const newFooter = await FooterModel.create(req.body);
        res.json(newFooter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updated = await FooterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const updated = await FooterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;