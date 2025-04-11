const mongoose = require('mongoose');

const StudentProgressSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    activity: {type: mongoose.Schema.Types.ObjectId, ref: 'learning_activities', required: true},
    progress: {type: String, enum: ['WORST', 'BAD', 'GOOD', 'BEST', 'BETTER']},
}, {timestamps: true});

module.exports = mongoose.model('student_progress', StudentProgressSchema);
