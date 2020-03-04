import mongoose from 'mongoose';


const jobAppSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  jobId: {
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

});
const jobApplication = mongoose.model('jobApplication', jobAppSchema);
export default jobApplication;
