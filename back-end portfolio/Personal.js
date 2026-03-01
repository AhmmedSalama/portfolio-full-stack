const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Personal = new mongoose.Schema({
    name: String,
    title: String,
    paragraph: String,
    image: String,
    email: String,
    phone: String,
    birthday: String,
    location: String,

});

const PersonalModel = mongoose.model('Personal', Personal);


router.post('/', async (req, res) => {
    const { name, title, paragraph, image, email, phone, birthday, location } = req.body;
    const myPersonal = await PersonalModel.create({name, title, paragraph, image, email, phone, birthday, location});;
    res.json(myPersonal);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, title, paragraph, image, email, phone, birthday, location } = req.body;
    const updatedPersonal = await PersonalModel.findByIdAndUpdate(id, {name, title, paragraph, image, email, phone, birthday, location}, { new: true });
    res.json(updatedPersonal);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updatedPersonal = await PersonalModel.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedPersonal);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedPersonal = await PersonalModel.findByIdAndDelete(id);
    res.json(deletedPersonal);
});

router.get('/', (req, res) => {
    res.send('Welcome to the Portfolio API personal');
});

module.exports = router;
