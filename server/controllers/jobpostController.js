const jobpost = require('./../models/jobpostModel');

exports.createnewjob = async (req, res) => {
  try {
    const newjobpost = await jobpost.create(req.body);
    res.status(201).json({
      status: 'Success Job Posted',
      data: {
        Jobposted: newjobpost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
