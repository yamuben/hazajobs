/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-st
// eslint-disable-next-line linebreak-st
import lodash from "lodash";
import dotenv from "dotenv";
import { encryptPassword, decryptPassword } from "../helpers/securedPassword";
import User from "../models/userModels";

import response from "../helpers/responses";

import { generateAuthToken } from "../helpers/tokens";

dotenv.config();

const createuser = async(req, res) => {
    try {
        let {
            userType,
            firstName,
            lastName,
            phoneNumber,
            email,
            password
        } = req.body;
        password = encryptPassword(password);
        const newUser = await User.create({
            userType,
            firstName,
            lastName,
            phoneNumber,
            email,
            password
        });
        const token = generateAuthToken(
            newUser._id,
            newUser.phoneNumber,
            newUser.email
        );
        const data = {
            token,
            userData: lodash.pick(
                newUser,
                "id",
                "userType",
                "firstName",
                "lastName",
                "email"
            )
        };
        return response.successResponse(
            res,

            201,

            "User created successfully",
            data
        );
    } catch (error) {
        return response.errorResponse(res, 400, error);
    }
};

const signinuser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });
        if (userLogin && decryptPassword(password, userLogin.password)) {
            const token = generateAuthToken(
                userLogin._id,
                userLogin.phoneNumber,
                userLogin.email
            );
            const data = {
                token,
                userData: lodash.pick(
                    userLogin,
                    "id",
                    "userType",
                    "firstName",
                    "lastName",
                    "email"
                )
            };

            return response.successResponse(
                res,

                200,

                "User logged in successfully",

                data
            );
        }
        return response.errorResponse(res, 401, "Incorrect email or password");
    } catch (error) {
        return response.errorResponse(res, 500, error);
    }
};

export default { createuser, signinuser };