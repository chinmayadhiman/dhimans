const mongoose = require('mongoose');
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const randomize = require('randomatic');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // if we get user in postman it will not show its password
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // confirmEmailToken: String,
    // isEmailConfirmed: {
    //     type: Boolean,
    //     default: false,
    // },
    // twoFactorCode: String,
    // twoFactorCodeExpire: Date,
    // twoFactorEnable: {
    //     type: Boolean,
    //     default: false,
    // }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Eccrypt password usinig bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Eccrypt password usinig bcrypt
// UserSchema.pre('save', async function (next) {
//     // const salt = await bcrypt.genSalt(10); // 10 is the arg which is known as number of rounds . heigher the number of rounds strong the password 
//     // this.password = await bcrypt.hash(this.password, salt); // this will hash our password

//     if (!this.isModified('Password')) {
//         next();
//     }
//     //   console.log("password modified")
//     const salt = await bcrypt.genSalt(10); // 10 is the arg which is known as number of rounds . heigher the number of rounds strong the password 
//     this.password = await bcrypt.hash(this.password, salt); // this will hash our password
//     console.log(this.password)
// });

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

/// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

/// Generate and hashed password token called from forgotpassword route
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex'); // generate som random data and we convert it into string og decimal to hexamdecimal

    /// Hash token and set to resetPasswordToke field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    /// sha256 is the algorithm we used to hasg restToken

    /// Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;  // 10 min from now to reset token 

    return resetToken
}

module.exports = mongoose.model('User', UserSchema)
