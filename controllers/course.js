const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../util/errorResponse')

exports.createCourse = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.bootcamp = await Bootcamp.findById(req.params.id);
    const course = await Course.create(req.body);
    res.status(201).json({
        success: true,
        data: course
    });
});