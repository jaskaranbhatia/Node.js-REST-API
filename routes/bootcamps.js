const express = require('express');
const router = express.Router();

const { getBootcamps, createBootcamp, getBootcamp } = require('../controllers/bootcamps')

router.route('/').get(getBootcamps)
router.route('/:id').get(getBootcamp)
router.route('/create_bootcamp').post(createBootcamp)

module.exports = router;