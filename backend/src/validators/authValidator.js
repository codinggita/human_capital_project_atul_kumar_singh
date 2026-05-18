const { body } = require('express-validator');

const registerValidator = [
  body('name').notEmpty().withMessage('Please add a name'),
  body('email').isEmail().withMessage('Please add a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidator = [
  body('email').notEmpty().withMessage('Please add an email').isEmail().withMessage('Please add a valid email'),
  body('password').notEmpty().withMessage('Please add a password')
];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Please provide current password'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

module.exports = {
  registerValidator,
  loginValidator,
  changePasswordValidator
};
