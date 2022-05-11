const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var DistrictSchema=new Schema({
    name: String,
    infected: Number
});

module.exports=mongoose.model('Districts',DistrictSchema);

