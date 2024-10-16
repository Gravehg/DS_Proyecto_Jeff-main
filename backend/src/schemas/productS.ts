import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  units: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
});

export type ProductT = InferSchemaType<typeof productSchema>;

export default mongoose.model("Product", productSchema);
