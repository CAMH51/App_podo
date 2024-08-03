const Router = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');

function routerApi(app){
    const router = Router();

    app.use('/api/v1', router);
    router.use('/auth',authRouter);
    router.use('/user',userRouter);

}


module.exports = routerApi;