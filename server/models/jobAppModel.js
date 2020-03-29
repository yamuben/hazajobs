import mongoose from 'mongoose';


const jobAppSchema = new mongoose.Schema({
  jobId: {
    type: String,
  },
  userId: {
    type: String,
  },
  jobOwnerId: {
    type: String,
  },
  jobOwner: {
    type: String,
  },
  jobTitle: {
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
