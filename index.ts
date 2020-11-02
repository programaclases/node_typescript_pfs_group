import express,{ Request, Response} from 'express';
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import { api } from './api';



var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const Port = process.env.PORT || 3000;


app.get('/', ( req: Request , res: Response) => {
    res.status(200).json({mesage: 'Primera ruta desde express'});
});
app.use('/api', api)

mongoose.connect('mongodb://localhost:27020/cursopfs', {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
    app.listen(Port, () => {
        console.log(`Escuchando desde el puerto:  ${Port}`);
        
    });
}).catch( error => {
    console.log('error en la conexión', error);
    
});




