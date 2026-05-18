const express = require('express');
const router = express.Router();

// HEAD Routes (return headers only, no body)
router.head('/prices', (req, res) => res.status(200).end());
router.head('/prices/:priceId', (req, res) => res.status(200).end());
router.head('/stats/prices', (req, res) => res.status(200).end());
router.head('/auth/me', (req, res) => res.status(200).end());
router.head('/health', (req, res) => res.status(200).end());

// OPTIONS Routes (return Allow header with supported methods)
router.options('/prices', (req, res) => {
  res.setHeader('Allow', 'GET, POST, HEAD, OPTIONS');
  res.status(204).end();
});

router.options('/prices/:priceId', (req, res) => {
  res.setHeader('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.status(204).end();
});

router.options('/auth/login', (req, res) => {
  res.setHeader('Allow', 'POST, OPTIONS');
  res.status(204).end();
});

router.options('/admin/prices', (req, res) => {
  res.setHeader('Allow', 'GET, POST, OPTIONS');
  res.status(204).end();
});

router.options('/search/prices', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});

router.options('/jwt/profile', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).end();
});

router.options('/health', (req, res) => {
  res.setHeader('Allow', 'GET, HEAD, OPTIONS');
  res.status(204).end();
});

module.exports = router;
