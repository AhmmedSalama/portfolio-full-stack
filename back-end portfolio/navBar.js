const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const NavBarSchema = new mongoose.Schema({
    logoText: { type: String, default: "PORTFOLIO" },
    cvUrl: { type: String },
    navLinks: [
        {
            label: { type: String, required: true }, 
            url: { type: String, required: true }  
        }
    ]
});

const NavBarModel = mongoose.model('NavBar', NavBarSchema);

router.get('/', async (req, res) => {
    try {
        const navBar = await NavBarModel.findOne(); 
        if (!navBar) return res.status(404).json({ message: "No NavBar data found" });
        res.json(navBar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const myNavBar = await NavBarModel.create(req.body);
        res.status(201).json(myNavBar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedNavBar = await NavBarModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedNavBar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await NavBarModel.findByIdAndDelete(req.params.id);
        res.json({ message: "NavBar deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;