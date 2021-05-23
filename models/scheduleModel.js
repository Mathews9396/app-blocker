const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    days: {
        type: [String],
        required: true,
    },
    startTime: Date,
    endTime: Date,
});


module.exports = mongoose.model('Schedule', scheduleSchema);
