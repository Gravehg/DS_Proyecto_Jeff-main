"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratedCalendarEvent = void 0;
var Decorator_1 = require("./Decorator");
var DecoratedCalendarEvent = /** @class */ (function (_super) {
    __extends(DecoratedCalendarEvent, _super);
    function DecoratedCalendarEvent(e, fieldName, fieldValue) {
        var _this = _super.call(this, e) || this;
        _this.fieldName = fieldName;
        _this.fieldValue = fieldValue;
        return _this;
    }
    DecoratedCalendarEvent.prototype.getCustomFields = function () {
        var customFields = this.decoratedEvent.getCustomFields();
        var result = customFields.concat([
            { name: this.fieldName, value: this.fieldValue },
        ]);
        return result;
    };
    return DecoratedCalendarEvent;
}(Decorator_1.Decorator));
exports.DecoratedCalendarEvent = DecoratedCalendarEvent;
