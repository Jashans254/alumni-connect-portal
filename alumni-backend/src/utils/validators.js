const { check } = require('express-validator');

exports.registerValidation = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('graduationYear', 'Graduation year is required').not().isEmpty(),
  check('branch', 'Branch is required').not().isEmpty()
];

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

exports.updateDetailsValidation = [
  check('firstName', 'First name is required').optional(),
  check('lastName', 'Last name is required').optional(),
  check('email', 'Please include a valid email').optional().isEmail()
];

exports.resetPasswordValidation = [
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 })
];

exports.updatePasswordValidation = [
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'New password must be at least 8 characters').isLength({ min: 8 })
];