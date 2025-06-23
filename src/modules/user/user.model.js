import mongoose, { Schema } from "mongoose"


const userSchema = new Schema({
    username: {
        type: String,
        required:true,
    },
    fullName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required:true
    },
    isVerifyEmail: {
        type: Boolean,
        default:false
    },
    isVerifyPhone: {
        type: Boolean,
        default:false
    },
    role: {
        type: String,
        default:"guest"
    },
    adress: {
        type: String,
        default: "",
    },
    bios: {
        type: String,
    },
    avatar: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    social: {
        facebook: {type: String, default:""},
        google: {type: String, default:""},
        twitter: {type: String, default:""},
        github: {type: String, default:""},
    },
}, {
    versionKey: false,
    timestamps:true,
}
)

export default mongoose.model("User", userSchema)