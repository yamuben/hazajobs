import mongoose from 'mongoose';


const feedBackSchema = new mongoose.Schema({
  employerId: {
    type: String,
  },
  jobId: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  score: {
    type: Number,
    required: [true, 'Enter score'],
  },
  remark: {
    type: String,
    required: [true, 'Enter remark'],
  },
});
const feedBackModel = mongoose.model('feedback', feedBackSchema);
export default feedBackModel;
