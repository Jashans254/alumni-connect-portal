const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  verifyEmail
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {
  registerValidation,
  loginValidation,
  updateDetailsValidation,
  resetPasswordValidation,
  updatePasswordValidation
} = require('../utils/validators');

// Public routes
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/logout', logout);
router.get('/verify/:token', verifyEmail);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPasswordValidation, validateRequest, resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetailsValidation, validateRequest, updateDetails);
router.put('/updatepassword', protect, updatePasswordValidation, validateRequest, updatePassword);

module.exports = router;