const Teacher = require('../schema/TeacherSchema');
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/UserSchema");

const createTeacher = async (req, res) => {
    try {
        const {teacher, subjectSpecialization} = req.body;

        const newTeacher = new Teacher({
            teacher: teacher,
            subjectSpecialization: subjectSpecialization
        });
        await newTeacher.save();

        res.status(201).json({status: true, message: "Teacher Data Saved SuccessFully"});
    } catch (error) {
        res.status(500).json({ststus: false, message: 'Error creating teacher', error: error.message});
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({status: true, data: teachers});
    } catch (error) {
        res.status(500).json({status: false, message: 'Error fetching teachers', error: error.message});
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({message: 'Teacher not found'});
        }

        res.status(200).json({message: 'Teacher deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting teacher', error: error.message});
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    deleteTeacher
};
