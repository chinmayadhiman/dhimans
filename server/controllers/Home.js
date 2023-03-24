const EnquiryForm = require('../modals/EnquiryFormModal')
const express = require('express')
const app = express();
// const ErrorResponse = require('../utils/errorResponse')
// const asyncHandler = require('../Middleware/async')
// @desc        Enquiry Form Submission
// @route       POST /api/v1/EnquiryForm 
// @access      Public
exports.home = async (req, res, next) => {
    // try {
    //     const { name, email, phone, country, message } = req.body;
    //     const enquiryform = await EnquiryForm.create({ name, email, phone, country, message });
    //     console.log(req.body);
    //     res.render("http://127.0.0.1:5501/index.html");
    //     // res.status(200).json({
    //     //     succes: true,
    //     //     data: "Done"
    //     // });
    // }
    // catch (err) {
    //     console.log(err);
    //     res.status(400).json({ succes: false, msg: "Enquiry Submission failed" });
    // }
    // res.status(200).json({ succes: true, msg: "Enquiry registered" });;

    // console.log(_dirname);
    app.use(express.static(__dirname + "/index.html"));
    // console.log(_dirname);
}