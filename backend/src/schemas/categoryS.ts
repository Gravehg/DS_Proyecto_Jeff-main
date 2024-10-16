import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  fatherCategory: { type: String },
});

export type CategoryT = InferSchemaType<typeof categorySchema>;

export default mongoose.model("Category", categorySchema);
