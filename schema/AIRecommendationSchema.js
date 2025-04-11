const mongoose = require('mongoose');

const AIRecommendationSchemaSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    activity: {type: mongoose.Schema.Types.ObjectId, ref: 'learning_activities', required: true},
    recordURL: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('ai_recommendation', AIRecommendationSchemaSchema);
