import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const notificationSchema: Schema = new Schema({
  userRef: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isRead: {type: Boolean, required: true},
});

export type OrderT = InferSchemaType<typeof notificationSchema>;

export default mongoose.model("Notification", notificationSchema);
