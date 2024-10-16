import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  recoverCode: { type: String },
  role: { type: Number, required: true },
});

export type UserT = InferSchemaType<typeof userSchema>;

export default mongoose.model("User", userSchema);
