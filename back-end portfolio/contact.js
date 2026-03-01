const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const contactSchema = new mongoose.Schema({
    email: String,
    phone: String,
    whatsapp: String,   
    location: String,
    linkedin: String,    
    github: String,
    facebook: String
});

const ContactModel = mongoose.model('Contact', contactSchema);

router.get('/', async (req, res) => {
    try {
        const contactData = await ContactModel.find();
        res.json(contactData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const myContact = await ContactModel.create(req.body);
        res.status(201).json(myContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ContactModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;