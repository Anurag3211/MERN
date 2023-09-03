const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority', // Correct write concern mode without semicolon
    j: true,
    wtimeout: 1000
  }
})
.then(() => {
  console.log('Connection to MongoDB successful');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
