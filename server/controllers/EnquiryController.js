const EnquiryForm = require('../modals/EnquiryFormModal')
// const express = require('express')
// const app = express();
// const ErrorResponse = require('../utils/errorResponse')
// const asyncHandler = require('../Middleware/async')
// @desc        Enquiry Form Submission
// @route       POST /api/v1/EnquiryForm 
// @access      Public
exports.SubmitEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, country, message } = req.body;
        const enquiryform = await EnquiryForm.create({ name, email, phone, country, message });
        console.log(req.body);
        // res.redirect('/home');
        // res.senFile(_dirname + "/index.html");
        // app.use(express.static(__dirname + "/index.html"));
        // res.redirect("/api/v1/");
        // res.redirect("/api/v1");
        res.status(200).json({
            succes: true,
            msg: "Enquiry Submitted"
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ succes: false, msg: "Enquiry Submission failed" });
    }
    // res.status(200).json({ succes: true, msg: "Enquiry registered" });
}