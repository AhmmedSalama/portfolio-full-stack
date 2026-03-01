const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model('Message', MessageSchema);

router.get('/', async (req, res) => {
    try {
        const messages = await MessageModel.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMessage = await MessageModel.create(req.body);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await MessageModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;