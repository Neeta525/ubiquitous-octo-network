const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetwork-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

},
console.log('db connected'));

// Export connection
module.exports = mongoose.connection;