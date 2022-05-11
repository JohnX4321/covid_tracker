const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const district_controller = require('../controllers/districts.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', district_controller.test);
router.post('/create',district_controller.district_create);
router.get('/all',district_controller.district_all);
router.delete('/:id/delete',district_controller.district_delete);

router.get('/:id',district_controller.district_details);
router.put('/:id/update',district_controller.district_update);


module.exports = router;
