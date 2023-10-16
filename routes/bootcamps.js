const express = require('express');
const { getBootcamps, 
        getBootcamp, 
        createBootcamps, 
        updateBootcamps, 
        deleteBootcamp,
        getBootcampsInRadius
} = require('../controllers/bootcamps');

// Include other resource router
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/')
      .get(getBootcamps)
      .post(createBootcamps);

router.route('/:id')
      .get(getBootcamp)
      .put(updateBootcamps)
      .delete(deleteBootcamp);

module.exports = router;