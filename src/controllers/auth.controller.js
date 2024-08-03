const client = require('../core/pg');
const jws = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {verificarPass} = require('../services/encript_decript_pass');

const authController = {};


authController.login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const user = await client.query('SELECT email, acontrasenia FROM usuarios WHERE email = $1 AND activo= true',[email]);
        console.log(user.rows);

        if(!email || !password){
            return res.status(401).json({estatus:false,msj:"Usuario y Contraseña requerido"});
        }else{
            if(user.rows == ""){
                return res.status(401).json({estatus:false,msj:"Autenticación fallida!"});
            }else{

                if(email === user.rows[0].email){
                    const comparePass = await verificarPass(password,user.rows[0].acontrasenia);

                    if(!comparePass){
                        return res.status(401).json({estatus:false,msj:"Autenticación fallida!"});
                     }else{

                         const token = jws.sign({email},process.env.SECRETKEY,{expiresIn:"1h"});
                            res.cookie("jws",token);
                            return res.status(200).json({estatus:true,token});
                     }

  /*               bcrypt.compare(password,user.rows[0].acontrasenia)
                     .then(resp=>{
    
                         console.log(resp);

                     }); */
                }else{
                    return res.status(401).json({estatus:false,msj:"Autenticación fallida!"});
                }
            }
            //client.end();
        }

    } catch (error) {
        return res.status(500).json({estatus:false,msj:"Error del servidor"});
    }

}


authController.logout = (req, res) =>{

}

module.exports = authController;