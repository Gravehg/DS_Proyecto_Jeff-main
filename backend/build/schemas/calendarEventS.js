"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var calendarEventSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    customFields: {
        type: [{ name: String, value: String }],
        required: true,
    },
});
exports.default = mongoose_2.default.model("CalendarEvent", calendarEventSchema);
