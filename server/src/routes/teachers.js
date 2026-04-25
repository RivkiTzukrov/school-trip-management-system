const router = require('express').Router();
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Teacher with this ID already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

router.get('/:id', async (req, res) => {
  const teacher = await Teacher.findOne({ id: req.params.id });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  res.json(teacher);
});

router.get('/:id/students', async (req, res) => {
  const teacher = await Teacher.findOne({ id: req.params.id });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  const students = await Student.find({ className: teacher.className });
  res.json(students);
});

module.exports = router;