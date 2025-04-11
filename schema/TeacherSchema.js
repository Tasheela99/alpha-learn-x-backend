const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    subjectSpecialization: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('teachers', TeacherSchema);
