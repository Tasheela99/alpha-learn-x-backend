const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    dob: {type: String, required: true},
    gradeLevel: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('students', StudentSchema);
