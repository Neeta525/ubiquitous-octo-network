const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  updateUser,
} = require('../../controllers/userControllers');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;