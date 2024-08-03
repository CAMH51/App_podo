const jws = require('jsonwebtoken');

function verifyToken(req, res, next){
    //const header = req.header("Authorization") || "";
    //const token = header.split(" ")[1];
    const token = req.cookies.jws;
    console.log(token);

    if (!token){
        //return res.status(401).json({msj:"No existe Token"});
        res.redirect('/login')
    }

    try {
        const payload = jws.verify(token,process.env.SECRETKEY);
        req.username = payload.username;
        next();

    } catch (error) {
        res.redirect('/login')
    }
}


module.exports = verifyToken;