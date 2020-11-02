import mongoose from 'mongoose';
// import * as uniqueValidator from 'mongoose-unique-validator';
const uniqueValidator = require('mongoose-unique-validator');

const Roles = {
    values: ['Admin','User'],
    message: '{VALUE} rol no permitido'
};

const userSchema = new mongoose.Schema({
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
        required: [true, 'Password es necesario' ],
    },
    role:{
        type: String,
        default: 'User',
        required: [true, 'El rol es necesario'],
        enum: Roles
    }
});

userSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'});
export const user = mongoose.model('user', userSchema);