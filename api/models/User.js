import mongoose, { Schema }  from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required:true
        },
        username: {
            type: String,
            required:true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
             type:String,
             required: false,
             default: "https://cdn3.vectorstock.com/i/1000x1000/96/12/young-man-avatar-cartoon-character-profile-picture-vector-25739612.jpg"
        },
        isAdmin: {
            type:Boolean,
            default:false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
);
 export default mongoose.model("User",UserSchema);