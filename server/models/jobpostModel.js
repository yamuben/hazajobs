import mongoose from 'mongoose';

const jobpostSchema = new mongoose.Schema({

  jobuserid: {
    type: String,
  },

  jobtitle: {
    type: String,
    required: [ true, 'Job title is required.' ],
    unique: false,
    trim: true,
  },

  organization: {
    type: String,
    required: [ true, 'Organisation is required.' ],
    unique: false,
    trim: true,
  },

  numberofpositions: {
    type: Number,
    required: [ true, 'Number of position is required.' ],
    unique: false,
    default: 1,
  },

  jobduration: {
    type: String,
    required: [ false, 'Job duration is required.' ],
    unique: false,
    default: 'Part-time',
  },

  deadline: {
    type: Date,
    required: [ true, 'Apllication deadline is required.' ],
    unique: false,
  },

  salary: {
    type: Number,
    required: [ false, 'Salary is not required.' ],
    unique: false,
  },

  workingdays: {
    type: Number,
    required: [ false, 'working days is not required.' ],
    unique: false,
  },

  joblocation: {
    type: Array,
    required: [ true, 'Job Location is required.' ],
    unique: false,
    trim: true,
  },

  jobdescription: {
    type: String,
    required: [ true, 'Job description is required.' ],
    unique: false,
    trim: true,
  },

  jobqualification: {
    type: String,
    required: [ false, 'Job qualification is not required.' ],
    unique: false,
    trim: true,
  },

  jobcreatedat: {
    type: Date,
    default: Date.now(),
  },
  jobStartFrom: {
    type: Date,
  },

  jobstate: {
    type: String,
    default: 'draft',
  },
});

const jobpost = mongoose.model('jobpost', jobpostSchema);
export default jobpost;
