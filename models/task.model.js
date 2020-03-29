const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  completed: {
    type: Boolean,
    default: false
  },
  enable: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('TaskModel', TaskSchema);