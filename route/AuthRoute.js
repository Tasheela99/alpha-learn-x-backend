const express = require('express');
const UserController = require('../api/AuthController');
const router = express.Router();
const authorized = require('../middleware/AuthMiddleware.js');


router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.login);
router.put('/admin/update-user-role/:id', authorized(['ADMIN']), UserController.updateUserRole);

module.exports = router;

