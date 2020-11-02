import express,{ Request, Response} from 'express';
import { userRoute } from './routes/userRoutes';


export const api = express();


api.get('/', ( req: Request , res: Response) => {
    res.status(200).json({mesage: 'Primera ruta desde la api'});
});

api.use('/users/', userRoute);