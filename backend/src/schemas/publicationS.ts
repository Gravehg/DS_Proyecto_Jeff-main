import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const publicationSchema: Schema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  tags: { type: [String], required: true }, //Collection
});

export type PublicationT = InferSchemaType<typeof publicationSchema>;

export default mongoose.model("Publication", publicationSchema);
