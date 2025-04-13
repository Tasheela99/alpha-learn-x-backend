const express = require('express');
const router = express.Router();
const authorized = require('../middleware/AuthMiddleware.js');
const UserController = require("../api/UserController");


router.get('/admin/get-all-users', authorized(['ADMIN']), UserController.getAllUsers);
router.delete("/admin/delete-user/:userId", authorized(['ADMIN']), UserController.deleteUser);


module.exports = router;