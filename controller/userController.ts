
import { Request, Response} from 'express';
import { userInterface } from '../interfaces/userInterface';
import { user } from '../models/userModel';

import * as bcryptjs from 'bcryptjs';



export const listarUsuarios = ( req: Request , res: Response) => {
    //console.log('Lista de usuarios');
    // const lista_usuarios = user.find({});
    user.find({}).then( resp => {
        res.status(200).json({mesage: 'Lista de usuarios', resp});
    }).catch( error => {
        res.status(200).json({ error });
    });
    
    
}


export const listUsuarios = async ( req: Request , res: Response) => {
    //console.log('Lista de usuarios');
    // const lista_usuarios = user.find({});
    try {
        const usuarios = await user.find({});
        res.status(200).json({mesage: 'Lista de usuarios', usuarios});
    } catch (error) {
        res.status(200).json({mesage: 'Lista de usuarios', error});
    }
  
}
// 
export const createUser = async ( req: Request , res: Response) => { 
   
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(req.body.password, salt);


    const usuario: userInterface = {
        nombre: req.body.nombre || '',
        email:  req.body.email,
        password: hash,
        role: req.body.role
    };  
    try {
       /*  const userFound = await user.find({
            email: usuario.email
        });
        if (userFound) {
            return res.status(200).json({mesage: 'Email en uso'});
        } else {
            const usercreate = await user.create( usuario);
            return res.status(200).json({mesage: 'Crear usuario', usercreate});
        } */
        const usercreate = await user.create( usuario);
        return res.status(200).json({mesage: 'Crear usuario', usercreate});
    } catch (error) {
        return res.status(200).json({mesage: 'Crear usuario', error});
    }
    
}

export const login = async ( req: Request , res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

    if ( email == null ) {
        return res.status(200).json({mesage: 'Se neceista email'});
    }

    if ( password == null ) {
        return res.status(200).json({mesage: 'Password obligatorio'});
    } 

   
    
    const userFound = await user.findOne({
        email: email
    });
    if (userFound) {
        // return res.status(200).json({mesage: userFound});

        let passw = userFound.get('password'); 

        let compare = bcryptjs.compareSync(password, passw);
        if (compare == true ){
            return res.status(200).json({mesage: userFound});
        } else {
            return res.status(200).json({mesage: 'Email o password incorrectos'});
        }

    } else {
        return res.status(200).json({mesage: 'Email o password incorrectos' });
    }

}