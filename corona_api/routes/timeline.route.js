const express = require('express');
const router = express.Router();

var timeline_controller=require('../controllers/timeline.controller.js');

router.get('/all',timeline_controller.timeline_all);
router.post('/create',timeline_controller.timeline_create);

module.exports=router;
