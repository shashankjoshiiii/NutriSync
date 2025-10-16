const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

// @route   POST /login
// @desc    Auth user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

// @route   GET /
// @desc    Get logged in user
// @access  Private
router.get('/', authMiddleware, getLoggedInUser);

module.exports = router;

