const express = require('express');
const { getBootcamps, 
        getBootcamp, 
        createBootcamps, 
        updateBootcamps, 
        deleteBootcamp,
        getBootcampsInRadius,
        bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource router
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo')
      .put(bootcampPhotoUpload);

router.route('/')
      // advancedResults takes in the model and any populate so courses in this below case
      .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
      .post(createBootcamps);

router.route('/:id')
      .get(getBootcamp)
      .put(updateBootcamps)
      .delete(deleteBootcamp);

module.exports = router;