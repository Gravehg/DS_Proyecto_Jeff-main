"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, email, phone, password, recoverCode, role, userId) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.recoverCode = recoverCode;
        this.role = role;
        this.userId = userId;
    }
    User.prototype.getID = function () {
        return this.userId;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPhone = function () {
        return this.phone;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getRecoverCode = function () {
        return this.recoverCode;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    User.prototype.setID = function (newId) {
        this.userId = newId;
    };
    User.prototype.setName = function (newName) {
        this.name = newName;
    };
    User.prototype.setEmail = function (newEmail) {
        this.email = newEmail;
    };
    User.prototype.setPhone = function (newPhone) {
        this.phone = newPhone;
    };
    User.prototype.setPassword = function (newPassword) {
        this.password = newPassword;
    };
    User.prototype.setRecoverCode = function (newRecoverCode) {
        this.recoverCode = newRecoverCode;
    };
    User.prototype.setRole = function (new_role) {
        this.role = new_role;
    };
    return User;
}());
exports.User = User;
