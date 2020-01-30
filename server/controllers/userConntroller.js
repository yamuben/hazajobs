const User = require("./../models/userModels");

export const createuser = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            status: "User succefull created",
            data: { user: newUser }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        });
    }
};
export const signinuser = async(req, res) => {
    try {
        const userlogin = await User.findOne(req.body);

        res.status(202).json({
            status: "User is  Availabel",
            data: { user: userlogin }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        });
    }
};