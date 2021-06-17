const express = require('express');
const router = express.Router();

const { getBootcamps, createBootcamp, getBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps')

router.route('/').get(getBootcamps)
router.route('/:id').get(getBootcamp)
router.route('/:id').put(updateBootcamp)
router.route('/:id').delete(deleteBootcamp)
router.route('/create_bootcamp').post(createBootcamp)

module.exports = router;