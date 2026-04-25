const router = require('express').Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Student with this ID already exists' });
    res.status(400).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get('/:id', auth, async (req, res) => {
  const student = await Student.findOne({ id: req.params.id });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

module.exports = router;