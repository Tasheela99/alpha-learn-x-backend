const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const AuthRoute = require('./route/AuthRoute');
const UserRoute = require('./route/UserRoute');
const TeacherRoute = require('./route/TeacherRoute');
const StudentRoute = require('./route/StudentRoute');
const AuthController = require('./api/AuthController');

const app = express();

//app.use(globalLimiter);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
});

mongoose.connect(DB_CONNECTION_STRING)
    .then(async () => {
        try {
            await AuthController.initializeAdmin();
        } catch (error) {
            console.error("Failed to initialize admin, but continuing startup:", error);
        }
        app.listen(PORT, () => {
            console.log(`API started and running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB:", error);
    });

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/teachers', TeacherRoute);
app.use('/api/v1/students', StudentRoute);
module.exports = app;
