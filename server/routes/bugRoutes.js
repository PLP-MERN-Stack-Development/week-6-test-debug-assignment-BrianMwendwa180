const express = require('express');
const { createBug, getMyBugs, getAllBugs, updateBug, deleteBug } = require('../controllers/bugController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize(['user', 'admin']), createBug);
router.get('/me', protect, authorize(['user', 'admin']), getMyBugs);
router.get('/all', protect, authorize(['admin']), getAllBugs);
router.put("/:id", protect, updateBug );
router.delete("/:id", protect, deleteBug);



module.exports = router;