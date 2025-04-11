const mongoose = require('mongoose');

const GamificationAndRewardSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    earnedBadges:{type:String}
},{ timestamps: true });

module.exports = mongoose.model('gamification_and_reward', GamificationAndRewardSchema);
