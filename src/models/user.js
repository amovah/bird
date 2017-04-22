import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', schema);
