const mongoose = require('mongoose');
const { Schema } = mongoose;

const appSchema = new Schema({
    name:String,
    installed: {type:Boolean,default:true},
    blocked: {type:Boolean,default:false},
    hoursToLimit:{type:Number,default:0},
    restricted: {type:Boolean,default:false},
    timeUsedApp:{type:Number,default:0},
    appStartTime:{type:Date}
});


module.exports = mongoose.model('App', appSchema);