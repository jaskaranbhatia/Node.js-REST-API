const Bootcamp = require('../models/Bootcamp')

// @desc -> get all bootcamps
// @route -> GET /api/bootcamps
// @access -> Public
exports.getBootcamps = async (req, res, next) => {
    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            data: bootcamps
        });
    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}

// @desc -> get single bootcamp
// @route -> GET /api/bootcamps/:id
// @access -> Public
exports.getBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}

// @desc -> create a bootcamp
// @route -> POST /api/bootcamps/create_bootcamp
// @access -> Public
exports.createBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch(err){
        res.status(400).json({
            success : false 
        })
    }
}

 