const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

router.post('/login', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID is required' });

    const teacher = await Teacher.findOne({ id });
    if (!teacher) return res.status(401).json({ error: 'Invalid ID' });

    const token = jwt.sign({ id: teacher.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;