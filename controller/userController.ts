
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
        // , {password: 0}
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


export const encontrarUsuario = async ( req: Request , res: Response) => { 
    // para recoger parámetros opciones /ruta/:id
    //  return res.json( { message : req.params });

    /*
    * para query params 
    *   /usuario?id=.....
    * return res.json( { message : req.query });
    */

  try {
    if (req.params.id == null  || req.params.id.length == 0) {
        return res.json( { message : 'Faltan parámetros' });
    } else {
       const id = req.params.id;
            // , {password: 0}
       const userFound = await user.findOne({_id: id} );
       return res.json( { message : userFound });
    }
    
  } catch (error) {
    return res.json( { message : 'Parámetro no permitido' });
  }

}


export const userUpdate = async ( req: Request , res: Response) => { 
    // para recoger parámetros opciones /ruta/:id
    //  return res.json( { message : req.params });

    /*
    * para query params 
    *   /usuario?id=.....
    * return res.json( { message : req.query });
    */

  try {
    if (req.params.id == null  || req.params.id.length == 0) {
        return res.json( { message : 'Faltan parámetros' });
    } else {
       const id = req.params.id;
       const usuario = req.body;
       delete usuario.password;
       //return res.json( { message : usuario });
       const userFound = await user.updateOne({_id: id},{ $set: usuario  });
       return res.json( { message : userFound });
    }
    
  } catch (error) {
    return res.json( { message : 'Parámetro no permitido' , error });
  }

}


export const deleteUser = async ( req: Request , res: Response) => { 

    try {
        const id = req.params.id;
        const userDelete = await user.deleteOne({_id: id});
        return res.json( { message : userDelete });
    } catch (error) {
        return res.json( { message : 'Parámetro no permitido' , error });
    }
}


export const updatePassword = async ( req: Request , res: Response) => { 
    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(req.body.password, salt);
    // return res.json( { message : req.body });
    try {
        const usuario = req.body;
        const password = hash;
        const userUpadte = await user.updateOne({_id: usuario.id }, { $set:{ password: password } });
        return res.json( { message : userUpadte });
    } catch (error) {
        return res.json( { message : 'Error ' , error });
    }
}