/* eslint-disable prefer-const */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable import/no-useless-path-segments */
import jobpost from "./../models/jobpostModel";
import response from "../helpers/responses";
import { userIdFromToken } from "../helpers/tokens";

const createnewjob = async(req, res) => {
    try {
        let {
            jobuserid,
            jobtitle,
            organization,
            numberofpositions,
            jobduration,
            deadline,
            salary,
            workingdays,
            joblocation,
            jobdescription,
            jobqualification
        } = req.body;
        const userId = userIdFromToken(req.header("x-auth-token"));

        jobuserid = userId;
        const newJobPost = await jobpost.create({
            jobuserid,
            jobtitle,
            organization,
            numberofpositions,
            jobduration,
            deadline,
            salary,
            workingdays,
            joblocation,
            jobdescription,
            jobqualification
        });
        return response.successResponse(
            res,

            201,

            "job posted successfully",
            newJobPost
        );
    } catch (error) {
        return response.errorResponse(res, 400, error);
    }
};

export default { createnewjob };