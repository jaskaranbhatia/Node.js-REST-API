// @desc -> get all bootcamps
// @route -> GET /api/bootcamps
// @access -> Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps"});
}