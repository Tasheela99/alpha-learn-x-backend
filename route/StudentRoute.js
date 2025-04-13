const express = require('express');
const StudentController = require("../api/StudentController");
const authorized = require('../middleware/AuthMiddleware.js');

const router = express.Router();

router.post('/create', authorized(["ADMIN", "TEACHER"]), StudentController.createStudent);
router.get('/get-all', authorized(["ADMIN", "TEACHER"]), StudentController.getAllStudents);
router.delete('/delete/:id', authorized(["ADMIN", "TEACHER"]), StudentController.deleteStudent);

module.exports = router;
