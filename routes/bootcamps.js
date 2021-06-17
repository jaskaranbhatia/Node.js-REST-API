const express = require('express');
const router = express.Router();

const { getBootcamps, createBootcamp, getBootcamp, updateBootcamp, deleteBootcamp, getBootcampById } = require('../controllers/bootcamps')

const { protect } = require('../middleware/auth')

router.route('/').get(getBootcamps)
router.route('/:id').get(getBootcamp)
router.route('/user/:id').get(getBootcampById)
router.route('/:id').put(protect, updateBootcamp)
router.route('/:id').delete(protect, deleteBootcamp)
router.route('/create_bootcamp').post(protect,createBootcamp)

module.exports = router;