const req = require('express/lib/request');
const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, 
      {
        $set: req.body
    },
    {new: true}
      )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that Id' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
//create friend
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friend: req.params.friendId }},
    { new: true }
  )
  .then(user => {
    if(!user) {
      res.status(404).json({ message: 'No user found with that Id' });
      return;
    }
    res.json(user);
  })
  .catch(err => res.status(400).json(err));
},
deleteFriend(req, res) {
  User.findOneAndDelete(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId }},
    { new:true }
  )
  .then(user => res.json(user))
  .catch(err => res.status(400).json(err));
}
};