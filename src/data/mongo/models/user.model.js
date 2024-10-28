import { Schema, model } from "mongoose";

const collection = "users"

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true,index:true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user","admin"],index:true},
    isOnline: { type: Boolean, default: "false" },
    photo: { type: String, default: "/public/assets/users/user-image.jpg" }
})
const User = model(collection, schema);
export default User