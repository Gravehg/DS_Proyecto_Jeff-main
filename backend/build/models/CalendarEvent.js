"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEvent = void 0;
var CalendarEvent = /** @class */ (function () {
    function CalendarEvent(date, duration, description, type, eventId) {
        this.eventId = eventId;
        this.date = date;
        this.duration = duration;
        this.description = description;
        this.type = type;
    }
    CalendarEvent.prototype.setEventId = function (eventId) {
        this.eventId = eventId;
    };
    CalendarEvent.prototype.getEventId = function () {
        return this.eventId;
    };
    CalendarEvent.prototype.getDate = function () {
        return this.date;
    };
    CalendarEvent.prototype.getDuration = function () {
        return this.duration;
    };
    CalendarEvent.prototype.getDescription = function () {
        return this.description;
    };
    CalendarEvent.prototype.getCustomFields = function () {
        return [];
    };
    CalendarEvent.prototype.getType = function () {
        return this.type;
    };
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;
