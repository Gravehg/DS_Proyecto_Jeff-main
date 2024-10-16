"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decorator = void 0;
var Decorator = /** @class */ (function () {
    function Decorator(eventToDecorate) {
        this.decoratedEvent = eventToDecorate;
    }
    Decorator.prototype.getEventId = function () {
        return this.decoratedEvent.getEventId();
    };
    Decorator.prototype.getDate = function () {
        return this.decoratedEvent.getDate();
    };
    Decorator.prototype.getDuration = function () {
        return this.decoratedEvent.getDuration();
    };
    Decorator.prototype.getDescription = function () {
        return this.decoratedEvent.getDescription();
    };
    Decorator.prototype.getCustomFields = function () {
        return this.decoratedEvent.getCustomFields();
    };
    Decorator.prototype.getType = function () {
        return this.decoratedEvent.getType();
    };
    return Decorator;
}());
exports.Decorator = Decorator;
