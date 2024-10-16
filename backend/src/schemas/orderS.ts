import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const orderSchema: Schema = new Schema({
  clientRef: { type: Schema.Types.ObjectId, required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  photoOfPayment: { type: String, required: true },
  lineProducts: {
    type: [
      { id: Schema.Types.ObjectId, name: String, units: Number, price: Number },
    ],
    required: true,
  },
  state: { type: Number, required: true }, // 1:Pendiente, 2:Aceptado, 3:Entregado, 4:Cancelado
});

export type OrderT = InferSchemaType<typeof orderSchema>;

export default mongoose.model("Order", orderSchema);
