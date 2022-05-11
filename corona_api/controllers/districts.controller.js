const DistrictSchema = require('../districtSchema');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.district_all=(req,res)=>{
    DistrictSchema.find(function (err,prod) {
        if (err) { console.log(err)}
        res.send(prod);

    })
}

exports.district_create=function (req,res) {

    let district=new DistrictSchema(
        {
            name: req.body.name,
            infected: req.body.infected,
            death: req.body.death
        }
    );
    district.save((err)=>{
        if (err){
            console.log('error');
        }
        res.send('District Entered Successfully');
    })
};


exports.district_details = function (req, res,next) {
    DistrictSchema.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};


exports.district_update = function (req, res) {
    DistrictSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.district_delete=function (req,res) {
    DistrictSchema.findByIdAndRemove(req.params.id,(err)=>{
        if(err) return next(err);
        res.send('Deleted Succesfully');
    })
}


/*
let district=new DistrictSchema({
            name: this.state.districtName,
            infected: this.state.district_count
        });

        db.collection('corona').insertOne(district,(err,res)=>{
            console.log(err);
            console.log('Saved to database '+err);
        })
 */
