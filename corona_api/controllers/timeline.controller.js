const TimelineSchema=require('../timeline_schema');

exports.timeline_create=(req,res)=>{

    let timeline=new TimelineSchema({
        index: req.body.index,
        cases: req.body.cases,
        recovered: req.body.recovered
    });
    timeline.save((err)=>{
        if (err) console.log(err);
        res.send('Timeline saved successfully');
    });

};

exports.timeline_all=(req,res)=>{
    TimelineSchema.find(function (err,prod) {
        if (err) { console.log(err)}
        res.send(prod);

    })
};
