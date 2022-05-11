var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var cors=require('cors');

const app=express();

const router=express.Router();
const districts=require('./routes/districts.route');
const timeline=require('./routes/timeline.route');

const mongoose=require('mongoose');
let url=''
mongoose.connect(url)
mongoose.Promise=global.Promise;
let db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection Error'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/districts',districts);
app.use('/timeline',timeline);

app.get('/',(req,res)=>{
  res.send('Hello')
})




// catch 404 and forward to error handler
const PORT=process.env.PORT||55123;
app.listen(PORT,()=>{
  console.log(`listening on ${PORT}`);
})
module.exports = app;
