const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
