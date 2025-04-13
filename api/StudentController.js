const Student = require('../schema/StudentSchema');

const createStudent = async (req, res) => {
    try {
        const {student, parent, dob, gradeLevel} = req.body;

        const newStudent = new Student({
            student: student,
            parent: parent,
            dob: dob,
            gradeLevel: gradeLevel
        });
        await newStudent.save();

        res.status(201).json({status: true, message: "Student Saved Successfully"});
    } catch (error) {
        res.status(500).json({status: false, message: 'Error creating student', error: error.message});
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('student')
            .populate('parent');
        res.status(200).json({status: true, data: students});
    } catch (error) {
        res.status(500).json({status: false, message: 'Error fetching students', error: error.message});
    }
};

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({message: 'Student not found'});
        }

        res.status(200).json({status: true, message: 'Student deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting student', error: error.message});
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    deleteStudent
};
