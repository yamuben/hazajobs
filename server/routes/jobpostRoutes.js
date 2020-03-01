/* eslint-disable eol-last */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import express from "express";
import jobpostController from "../controllers/jobpostController";
import { verifyAuth } from "../middlewares/authVerification";

const jobpostrouter = express.Router();

jobpostrouter.post("/newjobpost", verifyAuth, jobpostController.createnewjob);
jobpostrouter.get("/jobs", jobpostController.findALLjobs);
export default jobpostrouter;