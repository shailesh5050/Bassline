import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    role :string;
    createdAt: Date;
    updatedAt: Date;
    playlists: string[];
    likedSongs: string[];
}
const schema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    playlists: [{ type: String }],
    likedSongs: [{ type: String }]
}, {
    timestamps: true
});
export const UserModel = mongoose.model<IUser>('User', schema);
export default UserModel;