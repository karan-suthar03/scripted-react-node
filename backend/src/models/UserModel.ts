import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/user.types.js";

interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const UserModel = mongoose.model<IUserDocument>("UserModel", userSchema);

export default UserModel;
export type { IUserDocument };
