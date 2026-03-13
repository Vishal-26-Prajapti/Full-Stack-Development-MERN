/* eslint-disable no-undef */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Creates the Express app and sets the server port to 5000
const app = express();
const PORT = 5000;

// express.json() is a middleware in Express that:
    //  Automatically reads JSON data sent by the frontend
    //  Converts it into a JavaScript object
    //  Makes it available in req.body inside your routes
app.use(express.json());

app.use(cors({ // CORS (Cross-Origin Resource Sharing)
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,  // Don’t save the session again if nothing has changed
    saveUninitialized: false, // Don’t create a session for someone who hasn’t logged in yet.
    cookie: { secure: false } 
}));

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});