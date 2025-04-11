const mongoose = require('mongoose');

const LearningActivitySchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    difficultyLevel: {type: String, required: true,enum:['EASY','MEDIUM','HARD']},
    associatedSubject: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('learning_activities', LearningActivitySchema);
