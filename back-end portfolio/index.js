const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/myPortfolioDb")
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ Error connecting to MongoDB", err));

app.use(cors()); 
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const navBar = require('./navBar');
const Personal = require('./Personal');
const about = require('./about');
const skills = require('./Skills');
const Projects = require('./Projects');
const contact = require('./contact');
const footer = require('./footer');
const stats = require('./Stats');
const messages = require('./messages');

app.use('/navBar', navBar);
app.use('/Personal', Personal);
app.use('/about', about);
app.use('/Projects', Projects);
app.use('/skills', skills);
app.use('/contact', contact);
app.use('/footer', footer);
app.use('/stats', stats);
app.use('/messages', messages);

app.listen(port, () => {    
    console.log(`🚀 Server is running on http://localhost:${port}`);
});