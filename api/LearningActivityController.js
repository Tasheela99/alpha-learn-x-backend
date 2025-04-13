const LearningActivity = require('../schema/LearningActivitySchema');

const createLearningActivity = async (req, res) => {
    try {
        const {title, description, difficultyLevel, associatedSubject} = req.body;

        const createdBy = req.user?._id;
        if (!createdBy) return res.status(401).json({status: false, message: 'Unauthorized'});

        const newActivity = new LearningActivity({
            createdBy: createdBy,
            title: title,
            description: description,
            difficultyLevel: difficultyLevel,
            associatedSubject: associatedSubject,
        });

        await newActivity.save();
        res.status(201).json({status: true, message: "Learning Activity Saved Successfully"});
    } catch (error) {
        res.status(500).json({message: 'Error creating learning activity', error: error.message});
    }
};

const getAllLearningActivities = async (req, res) => {
    try {
        const activities = await LearningActivity.find();
        res.status(200).json({status: true, data: activities});
    } catch (error) {
        res.status(500).json({message: 'Error fetching activities', error: error.message});
    }
};

const deleteLearningActivity = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedActivity = await LearningActivity.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({message: 'Learning activity not found'});
        }

        res.status(200).json({status: true, message: 'Learning activity deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting activity', error: error.message});
    }
};

module.exports = {
    createLearningActivity,
    getAllLearningActivities,
    deleteLearningActivity
};
