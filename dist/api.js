"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express_1 = __importDefault(require("express"));
var userRoutes_1 = require("./routes/userRoutes");
exports.api = express_1.default();
exports.api.get('/', function (req, res) {
    res.status(200).json({ mesage: 'Primera ruta desde la api' });
});
exports.api.use('/users/', userRoutes_1.userRoute);
