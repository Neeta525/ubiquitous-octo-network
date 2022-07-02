const { User, Thought } = require('../models');

//Get all thoughts
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id})
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'thought created, but no users with this ID' })
          : res.json({ message: 'thought created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id }, 
      { $set: req.body },
      { new: true }
      )
      .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

//delete thought
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.id })
  .then((thought) =>
  !thought
  ? res.status(404).json({ message: 'No thought with that ID' })
  : res.json(thought)
)
.catch((err) => res.status(500).json(err));
},
//create reaction
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.body }},
    { new: true }
  )
  .then(thought => {
    if(!thought) {
      res.status(404).json({ message: 'No thought found with this Id' });
      return;
    }
    res.json(thought);
  })
  .catch(err => {
    console.log('try again');
    res.status(400).json(err);
  });
},

deleteReaction(req,res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.body.ractionId }}},
    { new: true }
  )
  .then(thoughts => {
    if(thoughts) {
      res.status(404).json({ message: 'No thought with that ID'});
      return;
    }
    res.json({ message: 'Reaction Deleted' });
  })
  .catch(err => res.json(err));
}
};

