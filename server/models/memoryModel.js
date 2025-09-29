const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String},
    summary: String,
    images: [String],
    people: [String],
    location: String
},
    {timestamps: true}
);

module.exports = mongoose.model('Memory', memorySchema);