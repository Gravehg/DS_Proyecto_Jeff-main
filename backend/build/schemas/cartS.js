"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var cartSchema = new mongoose_1.Schema({
    client: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    products: [
        {
            productRef: { type: mongoose_1.Schema.Types.ObjectId },
            units: { type: Number },
        },
    ], //Collection
});
exports.default = mongoose_2.default.model("Cart", cartSchema);
