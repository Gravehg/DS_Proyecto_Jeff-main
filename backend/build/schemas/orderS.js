"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.Schema({
    clientRef: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    photoOfPayment: { type: String, required: true },
    lineProducts: {
        type: [
            { id: mongoose_1.Schema.Types.ObjectId, name: String, units: Number, price: Number },
        ],
        required: true,
    },
    state: { type: Number, required: true }, // 1:Pendiente, 2:Aceptado, 3:Entregado, 4:Cancelado
});
exports.default = mongoose_2.default.model("Order", orderSchema);
