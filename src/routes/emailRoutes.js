const express = require('express');
const { getEmails } = require('../controllers/emailController');
const router = express.Router();

router.get('/emails', getEmails);

module.exports = router;