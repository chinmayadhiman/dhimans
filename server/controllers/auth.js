const User = require('../modals/user')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../Middleware/async')
// const sendEmail = require('../utils/sendEmail')
// const crypto = require('crypto')

// desc  register User
// route Post auth/register
// access = public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // create user
    const user = await User.create({
        name, email, password, role
    });

    sendTokenResponse(user, 200, res);

    // res.status(200).json({ success: true, token })
});

// desc  Login User
// route Post auth/register
// access = public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse("Invalid credential", 401));
    }

    // check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credential", 401));
    }

    sendTokenResponse(user, 200, res);

    // res.status(200).json({ success: true, token })
});

// desc  get current logged in user
// route get auth/me
// access = private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    })
})


/// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}