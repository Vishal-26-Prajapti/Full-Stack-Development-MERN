/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

const createOTPToken = (email, otp) => {
    return jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "1m" });
};

const verifyOTPToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { createOTPToken, verifyOTPToken };