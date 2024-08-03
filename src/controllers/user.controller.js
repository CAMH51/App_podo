const client = require('../core/pg');
const bcrypt = require('bcrypt');
const saltRounds = 10
const userController = {};
const {encriptar} = require('../services/encript_decript_pass');


userController.getUser = async(req, res) =>{

    try {
        const {id} = req.params;
        const user =  await client.query("SELECT * FROM usuarios WHERE id_usuario= $1 AND activo = true",[id]);
    
        if(user.rows == ""){
            res.status(401).json({img:"No existe registro!!"});
        }else{
    
            res.status(200).json({data:user.rows});
        }
        
    } catch (error) {
        console.error(error);
    }

}

userController.getUsers = async(req, res) =>{
    try {
        
        const users = await client.query("SELECT * FROM usuarios WHERE activo = true");
        if(users.rows == ""){
            res.status(401).json({img:"No existe registro!!"});
        }else{
    
            res.status(200).json({data:users.rows});
            console.log(users.rows)
        }
    } catch (error) {
        console.error(error);
    }

}

userController.addUser = async(req, res)=>{
    try {
        
        const {fk_id_tipo_perfil, email, nombre_usuario, acontrasenia } = req.body;
        const passEncript = await encriptar(acontrasenia,saltRounds);
        console.log(passEncript);
    
        const user = await client.query("SELECT * FROM usuarios WHERE email = $1",[email]);
    
        console.log(user.rowCount);
    
        if(user.rowCount > 0){
            res.status(401).json({msj:'Usuario ya agregado!'});
        }else{
            const addUser = await client.query('INSERT INTO usuarios ( fk_id_tipo_perfil, email, nombre_usuario, acontrasenia) VALUES($1,$2,$3,$4)',[fk_id_tipo_perfil, email, nombre_usuario, passEncript]);
            res.status(201).json({msj:'Usuario Agregado!!'});
            console.log('usuario',addUser);
        }
    } catch (error) {
        console.error(error);
    }

}

userController.updateUser = async(req, res) =>{

    try {
        let criterios=[];
        let valores = [];
        let contador = 0;
        const {id} = req.params;
        const datos= req.body;
        console.log(datos['email']);
        if(datos['email'] != undefined){
            const user =  await client.query("SELECT * FROM usuarios WHERE email= $1",[datos['email']]);
        }
        if(user.rowCount > 0 ){
            res.status(401).json({msj:'No se puede modificar el correo porque ya existe!!'});
        }else{

            let claves =Object.keys(datos);
            for(let i=0; i< claves.length; i++){
                contador++;
                let clave = claves[i];
                valores.push(datos[clave])
                criterios.push(claves[i]+'= $'+ contador) ;
            } 

            const updateUser = await client.query("UPDATE usuarios SET "+ criterios + " WHERE id_usuario = "+ id,valores);  
            res.status(201).json({msj:'Registro Modificado!!!'});
        }
    
        

    } catch (error) {
        console.error(error);
    }
}

userController.deleteUser = async(req, res) =>{
    try {
        const {id} = req.params;
    
        const deteleuser = await client.query('UPDATE usuarios SET activo=false WHERE id_usuario = $1',[id]);
        if(deteleuser.rowCount > 0){
            res.status(201).json({msj:'Usuario Eliminado!!'});
        }else{
            res.status(401).json({msj:'No se puedo eliminar!!'});
        }
        console.log(deteleuser)
    } catch (error) {
        console.error(error);
    }
}




module.exports = userController;