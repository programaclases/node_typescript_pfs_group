"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//const mongoose = require('mongoose');
var mongoose_1 = __importDefault(require("mongoose"));
var api_1 = require("./api");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express_1.default();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
var Port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.status(200).json({ mesage: 'Primera ruta desde express' });
});
app.use('/api', api_1.api);
mongoose_1.default.connect('mongodb://localhost:27020/cursopfs', { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
    app.listen(Port, function () {
        console.log("Escuchando desde el puerto:  " + Port);
    });
}).catch(function (error) {
    console.log('error en la conexión', error);
});
