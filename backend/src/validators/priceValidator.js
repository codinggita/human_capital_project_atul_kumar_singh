const { body } = require('express-validator');

const createPriceValidator = [
  body('country').notEmpty().withMessage('Country code is required').isString(),
  body('countryLabel').notEmpty().withMessage('Country label is required').isString(),
  body('indicator').notEmpty().withMessage('Indicator code is required').isString(),
  body('indicatorLabel').notEmpty().withMessage('Indicator label is required').isString(),
  body('value').optional({ nullable: true }).isNumeric().withMessage('Value must be a number'),
  body('year').notEmpty().withMessage('Year is required').isNumeric().withMessage('Year must be a number'),
  body('month').notEmpty().withMessage('Month is required').isNumeric().withMessage('Month must be a number'),
  body('freq').optional().isString()
];

const updatePriceValidator = [
  body('country').optional().isString(),
  body('countryLabel').optional().isString(),
  body('indicator').optional().isString(),
  body('indicatorLabel').optional().isString(),
  body('value').optional({ nullable: true }).isNumeric(),
  body('year').optional().isNumeric(),
  body('month').optional().isNumeric(),
  body('freq').optional().isString()
];

module.exports = {
  createPriceValidator,
  updatePriceValidator
};
