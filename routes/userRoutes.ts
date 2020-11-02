import express,{ Request, Response} from 'express';
import * as usuarioController from '../controller/userController';



export const userRoute = express();


userRoute.get('/listar', usuarioController.listarUsuarios );
userRoute.get('/list', usuarioController.listUsuarios );
userRoute.post('/crear', usuarioController.createUser );
userRoute.post('/login', usuarioController.login );