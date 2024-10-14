const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { title, description, dueDate, userId } = req.body;
  const task = new Task({ title, description, dueDate, userId });
  await task.save();
  res.json({ message: 'Task created successfully', task });
});

router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.query.userId });
  res.json(tasks);
});

module.exports = router;
