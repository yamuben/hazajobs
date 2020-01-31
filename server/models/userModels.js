import validator from "validator";
import mongoose from "mongoose";

// First name *
//   Last name *
//     Phone *
//     Email
// Gender *
//   ID no / Passport no
// Profile Picture *
//   Location(District, Sector) *
//   Skills(Category; Sub Category) limits 5 *
//     Self - description
// Portfolio
// Certification(Attachment)
// Education
// Experience
// Status
// User type (>Individual, >Company)
// password

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        // required: [true, 'choose  between  individual  or company'],
        default: "individual",
        enum: {
            values: ["Individual", "Company"],
            messages: "User type must be Individual / Company"
        },
        trim: true
    },
    firstName: {
        type: String,
        required: [true, "please  tell us your  name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "please  tell us your  name"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "please  provide your  phone number"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "please  tell us your  email"],

        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Provide valid email"]
    },

    password: {
        type: String,
        required: [true, "please  provide your  password"],
        select: false
    },
    gender: {
        type: String,
        default: "",
        trim: true
    },
    id_passport: {
        type: String,
        default: "",
        trim: true
    },
    profilepicture: {
        type: String,
        default: "",
        trim: true
    },
    location: [String],
    skills: [String],
    selfdescription: {
        type: String,
        default: "",
        trim: true
    },
    portifolio: {
        type: String,
        default: "",
        trim: true
    },
    education: {
        type: String,
        default: "",
        trim: true
    },
    experience: {
        type: String,
        default: "",
        trim: true
    },
    certification: [String],
    status: {
        type: String,
        default: "",
        trim: true
    }
});
const Userprofile = mongoose.model("Userprofile", userSchema);

export default Userprofile;