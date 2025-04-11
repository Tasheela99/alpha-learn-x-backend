const express = require('express');
const AuthController = require('../api/AuthController');
const router = express.Router();
const authorized = require('../middleware/AuthMiddleware.js');


router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.login);