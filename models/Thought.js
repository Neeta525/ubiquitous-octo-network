const { Schema, model, Types } = require('mongoose');

// Schema for what makes up a reaction
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  }, 
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Schema for what makes up a thought
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    reactionSchema
  ]
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
})
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
}
  )
// Initialize the thought model

const Thought = model('thought', thoughtSchema);

module.exports = Thought;