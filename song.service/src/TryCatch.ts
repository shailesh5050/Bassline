import {NextFunction,Request,Response,RequestHandler} from 'express'

const TryCathch = (handler:RequestHandler) :RequestHandler =>{
    return async (req:Request,res:Response,Next:NextFunction) => {
        try {
            await handler(req,res,Next);
        } catch (error) {
            console.error('Error in TryCatch middleware:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
export default TryCathch;