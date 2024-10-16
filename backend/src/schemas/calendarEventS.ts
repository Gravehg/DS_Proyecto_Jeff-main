import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const calendarEventSchema: Schema = new Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  customFields: {
    type: [{ name: String, value: String }],
    required: true,
  },
});

export type OrderT = InferSchemaType<typeof calendarEventSchema>;

export default mongoose.model("CalendarEvent", calendarEventSchema);
