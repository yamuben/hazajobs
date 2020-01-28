import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: [true, 'choose  between  individual  or company'],
  },
  firstName: {
    type: String,
    required: [true, 'please  tell us your  name'],
  },
  lastName: {
    type: String,
    required: [true, 'please  tell us your  name'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'please  provide your  phone number'],
  },
  email: {
    type: String,
    required: [true, 'please  tell us your  email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide valid email'],
  },

  password: {
    type: String,
    required: [true, 'please  provide your  password'],
  },
});
const User = mongoose.Schema('User', userSchema);

export default User;
