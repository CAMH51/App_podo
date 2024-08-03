const bcrypt = require('bcrypt');
const optionPass = {};

optionPass.encriptar = async(acontrasenia,saltRounds)=>{
    const passEncript = await bcrypt.hash(acontrasenia,saltRounds).then(resp=>{return resp;})

    return passEncript;
}

optionPass.verificarPass = async(inputPass, dbPass)=>{
    const verificarPass = await bcrypt.compare(inputPass,dbPass);
    return verificarPass;
}

module.exports = optionPass;