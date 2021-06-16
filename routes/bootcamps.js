const express = require('express');
const router = express.Router();

const { getBootcamps } = require('../controllers/bootcamps')

router.route('/').get(getBootcamps)

module.exports = router;