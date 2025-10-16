const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/food/log
// @desc    Log a food item
// @access  Private
router.post('/log', auth, foodController.logFood);

// @route   GET api/food/today
// @desc    Get food logged today
// @access  Private
router.get('/today', auth, foodController.getTodaysFood);

// @route   GET api/food/weekly-protein
// @desc    Get nutrient summary for the last 7 days
// @access  Private
router.get('/weekly-protein', auth, foodController.getWeeklySummary);

module.exports = router;

