import mongoose from 'mongoose';


const jobAppSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  jobId: {
    type: String,
  },
  jobOwner: {
    type: String,
  },
  jobAppDate: {
    type: Date,
    default: Date.now(),
  },
  proposal: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },


});
const jobApplication = mongoose.model('jobApplication', jobAppSchema);
export default jobApplication;
