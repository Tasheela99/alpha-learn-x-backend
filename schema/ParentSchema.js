const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    phone: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('parents', ParentSchema);
