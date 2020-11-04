import express,{ Request, Response} from 'express';
import * as usuarioController from '../controller/userController';



export const userRoute = express();


userRoute.get('/listar', usuarioController.listarUsuarios );
userRoute.get('/list', usuarioController.listUsuarios );
userRoute.get('/usuario/:id', usuarioController.encontrarUsuario );
userRoute.post('/crear', usuarioController.createUser );
userRoute.post('/login', usuarioController.login );
userRoute.put('/update/:id', usuarioController.userUpdate );
userRoute.put('/update_passw/', usuarioController.updatePassword );
userRoute.delete('/delete/:id', usuarioController.deleteUser );
// parámetro opcional  /:id 
// userRoute.get('/usuario', usuarioController.encontrarUsuario );