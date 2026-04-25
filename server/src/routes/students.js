const router = require('express').Router();
const Student = require('../models/Student');

// POST /api/students — register a student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Student with this ID already exists' });
    res.status(400).json({ error: err.message });
  }
});

// GET /api/students — get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// GET /api/students/:id — get single student
router.get('/:id', async (req, res) => {
  const student = await Student.findOne({ id: req.params.id });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

module.exports = router;