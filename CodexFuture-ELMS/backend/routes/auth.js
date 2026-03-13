// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // Imports bcrypt, a library for securely hashing passwords.
const session = require('express-session'); // Imports the session module — helps you keep a user logged in.
const crypto = require('crypto'); // Imports Node’s crypto module (for generating secure random strings or tokens).
const nodemailer = require('nodemailer'); // Imports Nodemailer, a Node.js library for sending emails

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
    try {
        const { username, useremail, password } = req.body;
        // Check for empty fields
        if (!username || !useremail || !password) {
            return res.json({ success: false, message: 'All fields required!' });
        }

        db.query('SELECT * FROM users WHERE useremail = ?', [useremail], async (err, result) => {
            if (err) {
                console.error("DB error:", err);
                return res.json({ success: false, message: 'Database error' });
            }

            if (result.length > 0) return res.json({ success: false, message: 'Email already exists' });

            const hashedPassword = await bcrypt.hash(password, 10); // bcrypt.hash() converts the plain password into a secure hashed string. --> The 10 is the salt rounds — more rounds = stronger encryption.
            db.query(
                'INSERT INTO users (username, useremail, password) VALUES (?, ?, ?)',
                [username, useremail, hashedPassword],
                (err2) => {
                    if (err2) {
                        console.error("DB insert error:", err2);
                        return res.json({ success: false, message: 'Database error' });
                    }
                    res.json({ success: true, message: 'User registered successfully!', user: { username, useremail } });
                }
            );
        });
    } catch (err) {
        console.error("Register error:", err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ---------------- LOGIN ----------------
router.post('/login', (req, res) => {
    try {
        const { useremail, password } = req.body;
        if (!useremail || !password) {
            return res.json({ success: false, message: 'All fields required!' });
        }

        const checkLogin = (tableName) => {
            let query = "";

            if (tableName === "users") {
                query = "SELECT * FROM users WHERE useremail = ?";
            } else if (tableName === "students") {
                query = "SELECT * FROM students WHERE email = ?";
            } else {
                return res.json({ success: false, message: 'Invalid table name' });
            }

            console.log(`🟡 Running query on: ${tableName}`);

            db.query(query, [useremail], async (err, result) => {
                if (err) {
                    console.error(`❌ MySQL error on ${tableName}:`, err.sqlMessage || err);
                    return res.json({ success: false, message: `Database error on ${tableName}: ${err.sqlMessage}` });
                }

                if (result.length === 0) {
                    if (tableName === 'users') return checkLogin('students');
                    return res.json({ success: false, message: 'User not found' });
                }

                const user = result[0];
                console.log(`✅ Found user in ${tableName}:`, user);

                let match = false;
                try {
                    match = await bcrypt.compare(password, user.password);
                } catch {
                    console.warn("⚠️ bcrypt compare failed, maybe plain password.");
                }

                // If bcrypt fails or plain text stored
                if (!match && password === user.password) match = true;

                if (!match) return res.json({ success: false, message: 'Incorrect password' });

                req.session.user = {
                    userid: user.userid || user.studentid,
                    username: user.username || user.name,
                    useremail: user.useremail,
                    role: tableName
                };

                return res.json({
                    success: true,
                    message: `Login successful as ${tableName}!`,
                    user: req.session.user
                });
            });
        };

        checkLogin('users');

    } catch (err) {
        console.error("Login error:", err);
        res.json({ success: false, message: 'Server error' });
    }
});


// ---------------- LOGOUT ----------------
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.json({ success: false, message: 'Logout failed' });
        res.json({ success: true, message: 'Logged out successfully!' });
    });
});

// ---------------- CURRENT USER ----------------
router.get('/current-user', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {    
        res.json({ loggedIn: false });
    }
});

// ---------------- FORGOT PASSWORD FLOW ----------------

// 1️ Send OTP
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: 'Email required!' });

    db.query('SELECT * FROM users WHERE useremail = ?', [email], (err, result) => {
        if (err) return res.json({ success: false, message: 'Database error' });
        if (result.length === 0) return res.json({ success: false, message: 'User not found!' });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpToken = crypto.randomBytes(16).toString('hex');

        if (!global.otpStore) global.otpStore = {};
        global.otpStore[otpToken] = { otp, email, createdAt: Date.now() };

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'CodexFuture Password Reset OTP',
            html: `<p>Your OTP is: <b>${otp}</b> (valid 1 minutes)</p>`
        };

        transporter.sendMail(mailOptions, (err2, info) => {
            if (err2) {
                console.error("OTP sending error:", err2);
                return res.json({ success: false, message: 'Failed to send OTP', error: err2.message });
            }
            console.log("OTP sent:", info.response);
            res.json({ success: true, message: 'OTP sent to email!', token: otpToken });
        });
    });
});

// 2️ Verify OTP
router.post('/verify-otp', (req, res) => {
    const { token, otp } = req.body;
    if (!token || !otp) return res.json({ success: false, message: 'Token and OTP required!' });

    const record = global.otpStore?.[token];
    if (!record) return res.json({ success: false, message: 'Invalid or expired token!' });

    if (Date.now() - record.createdAt > 1 * 60 * 1000) {
        delete global.otpStore[token];
        return res.json({ success: false, message: 'OTP expired!' });
    }

    if (parseInt(otp) !== record.otp) return res.json({ success: false, message: 'Incorrect OTP!' });

    res.json({ success: true, email: record.email, message: 'OTP verified!' });
});

// 3️ Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.json({ success: false, message: 'Email and new password required!' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.query('UPDATE users SET password = ? WHERE useremail = ?', [hashedPassword, email], (err) => {
        if (err) return res.json({ success: false, message: 'Database error!' });

        if (global.otpStore) {
            for (let key in global.otpStore) {
                if (global.otpStore[key].email === email) delete global.otpStore[key];
            }
        }

        res.json({ success: true, message: 'Password updated successfully!' });
    });
});

// Admin add students
router.post('/add-student', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.json({ success: false, message: "All fields required!" });

    try {
        // Convert password to hash
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Database error!' });
                }
                res.json({ success: true, message: 'Student added successfully!' });
            }
        );
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error!' });
    }
});

// Get all students
router.get('/students', (req, res) => {
    db.query('SELECT name, email FROM students', (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Database error!' });
        }
        res.json({ success: true, students: result });
    });
});

// Delete a student by email
router.delete('/students/:email', (req, res) => {
    const { email } = req.params;
    db.query('DELETE FROM students WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Database error!' });
        }
        if (result.affectedRows === 0) {
            // No student found with that email
            return res.json({ success: false, message: 'Student not found!' });
        }
        res.json({ success: true, message: 'Student deleted successfully!' });
    });
});



module.exports = router;