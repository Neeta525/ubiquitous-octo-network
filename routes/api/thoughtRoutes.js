const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  // addReaction,
  // deleteReaction,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought);

// router.route('/').post(addReaction);

// router.route('/').delete(deleteReaction);

module.exports = router;

