const express = require('express');
const router = express.Router();

// Sample route for /api/tasks
router.get('/', (req, res) => {
  res.json({ message: 'Task routes are working!' });
});

module.exports = router;
