const router = require('express').Router();
const Location = require('../models/Location');
const Student = require('../models/Student');

function dmsToDecimal(degrees, minutes, seconds) {
  return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
}

// POST /api/locations — receive GPS ping from tracker device
router.post('/', async (req, res) => {
  try {
    const { ID, Coordinates, Time } = req.body;

    const lat = dmsToDecimal(
      Coordinates.Latitude.Degrees,
      Coordinates.Latitude.Minutes,
      Coordinates.Latitude.Seconds
    );
    const lng = dmsToDecimal(
      Coordinates.Longitude.Degrees,
      Coordinates.Longitude.Minutes,
      Coordinates.Longitude.Seconds
    );

    const location = await Location.findOneAndUpdate(
      { studentId: String(ID) },
      { studentId: String(ID), lat, lng, time: new Date(Time) },
      { upsert: true, new: true }
    );

    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/locations — get latest position of all students
router.get('/', async (req, res) => {
  const locations = await Location.find();
  const students = await Student.find();

  const enriched = locations.map((loc) => {
    const student = students.find((s) => s.id === loc.studentId);
    return {
      ...loc.toObject(),
      name: student ? `${student.firstName} ${student.lastName}` : loc.studentId,
      className: student?.className,
    };
  });

  res.json(enriched);
});

// GET /api/locations/:id — get latest position of one student
router.get('/:id', async (req, res) => {
  const location = await Location.findOne({ studentId: req.params.id });
  if (!location) return res.status(404).json({ error: 'Location not found' });
  res.json(location);
});

module.exports = router;