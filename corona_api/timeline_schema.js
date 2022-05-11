const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var TimelineSchema=new Schema({
    index: Number,
    cases: Number,
    recovered: Number
});

module.exports=mongoose.model('Timeline',TimelineSchema);

