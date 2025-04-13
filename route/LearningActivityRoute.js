const express = require('express');
const LearningActivityController = require("../api/LearningActivityController");
const router = express.Router();
const authorized = require('../middleware/AuthMiddleware.js');


router.post('/create', authorized(["ADMIN", "TEACHER"]), LearningActivityController.createLearningActivity);
router.get('/get-all', authorized(["ADMIN", "TEACHER", "PARENT", "STUDENT"]), LearningActivityController.getAllLearningActivities);
router.delete('/delete/:id', authorized(["ADMIN", "TEACHER"]), LearningActivityController.deleteLearningActivity);

module.exports = router;
