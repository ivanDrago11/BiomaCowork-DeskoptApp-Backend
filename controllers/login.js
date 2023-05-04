const { response } = require('express');
const Usuario2 = require('../models/Usuario2');
const { compare } = require('bcryptjs');


const loginCtrl = async (req, res = response) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await Usuario2.findOne( { email });
        console.log(user)
        if(!user){
            res.status(404);
            res.send({msg: 'user not found'});
        }
        if(password == user.password){
            res.status(200);
            res.send({ok: true,user});
        }else{
            res.status(404);
            res.send({msg: 'Contraseña incorrecta'});
        }

        }catch(err){
             console.log(err)
        }
        
}

module.exports = {
    loginCtrl
}