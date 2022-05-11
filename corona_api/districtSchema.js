const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var DistrictSchema=new Schema({
    name: String,
    infected: Number,
    death: Number
});

module.exports=mongoose.model('Districts',DistrictSchema);

