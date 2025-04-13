const express = require('express');
const TeacherController = require("../api/TeacherController");
const authorized = require('../middleware/AuthMiddleware.js');
const router = express.Router();

router.post('/create', authorized(["ADMIN"]), TeacherController.createTeacher);
router.get('/get-all', authorized(["ADMIN"]), TeacherController.getAllTeachers);
router.delete('/delete/:id', authorized(["ADMIN"]), TeacherController.deleteTeacher);

module.exports = router;
