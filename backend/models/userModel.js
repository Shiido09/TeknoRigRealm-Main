import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        firebaseUid: {
            type: String,
            required: true,
        },
        avatar: {
            public_id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
        },
        pushToken: {
            type: String, // Field to store Expo push token
            required: false,
        },
        
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);