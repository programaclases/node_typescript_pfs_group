"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// import * as uniqueValidator from 'mongoose-unique-validator';
var uniqueValidator = require('mongoose-unique-validator');
var Roles = {
    values: ['Admin', 'User'],
    message: '{VALUE} rol no permitido'
};
var userSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario'],
    },
    password: {
        type: String,
        required: [true, 'Password es necesario'],
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'El rol es necesario'],
        enum: Roles
    }
});
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
exports.user = mongoose_1.default.model('user', userSchema);
