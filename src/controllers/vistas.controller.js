const vistaController = {};

vistaController.login = (req,res)=>{
 res.render('login')
}

vistaController.inicio = (req,res)=>{
    res.render('home')
}
   
vistaController.usuarios = (req,res)=>{
    res.render('usuarios')
}
   

module.exports  = vistaController;