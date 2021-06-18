const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../util/errorResponse')

// @desc -> get all bootcamps
// @route -> GET /api/bootcamps
// @access -> Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude for filtering
    const removeFields = ['select', 'sort']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);  

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    query = Bootcamp.find(JSON.parse(queryStr));

    // Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    // Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy);
    }
    else{
        query = query.sort('-createdAt');
    }

    const bootcamps = await query;
    
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});


// @desc -> get single bootcamp
// @route -> GET /api/bootcamps/:id
// @access -> Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
});

// @desc -> create a bootcamp
// @route -> POST /api/bootcamps/create_bootcamp
// @access -> Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id
    
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
});

exports.getBootcampById = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.find({user : req.params.id});
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with user id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
});

// @desc -> update single bootcamp
// @route -> PUT /api/bootcamps/:id
// @access -> Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, data: bootcamp})
});

// @desc -> delete single bootcamp
// @route -> DELETE /api/bootcamps/:id
// @access -> Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success: true, data: {} })
});


 