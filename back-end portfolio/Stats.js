const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const Project = mongoose.model('Project');
        const Skill = mongoose.model('Skills'); 

        const projectsCount = await Project.countDocuments();
        const skillsCount = await Skill.countDocuments();
        
        const stats = [
            { label: 'Total Projects', value: projectsCount.toString(), icon: '📂' },
            { label: 'Tech Stack', value: skillsCount.toString(), icon: '⚡' },
            { label: 'Experience', value: '3+', icon: '⭐' },
            { label: 'Contributions', value: '450+', icon: '📈' }
        ];
        
        res.json(stats);
    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;