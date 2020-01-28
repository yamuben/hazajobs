import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please  tell us your  name'],
  },
  email: {
    type: String,
    required: [true, 'please  tell us your  email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide valid email'],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, 'please  provide  your  password'],
    minlength: 8,
  },
  passwordCofirm: {
    type: String,
    required: [true, 'please  confirm  your  password'],
  },
});
const User = mongoose.Schema('User', userSchema);

export default User;
