import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const cartSchema: Schema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true },
  products: [
    {
      productRef: { type: Schema.Types.ObjectId },
      units: { type: Number },
    },
  ], //Collection
});

export type CartT = InferSchemaType<typeof cartSchema>;

export default mongoose.model("Cart", cartSchema);
