const { response } = require('express');
const Usuario2 = require('../models/Usuario2');

const getUsuarios = async( req, res = response ) => {

    const usuarios = await Usuario2.find();

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async ( req, res = response ) => {

    const usuario = new Usuario2( req.body );

    try {
        
        const usuarioGuardado = await usuario.save();

        res.json({
            ok: true,
            evento: usuarioGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            // msg: 'Hable con el administrador'
            msg: 'Error al crear el usuario'
        });
    }
}

const actualizarUsuario = async( req, res = response ) => {
    
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
       const usuarioId = req.body.id;

    try {

        const usuario = await Usuario2.findById( usuarioId );

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este usuario'
        //     });
        // }

        const nuevoUsuario = {
            ...req.body,
            user: usuarioId
        }

        const usuarioActualizado = await Usuario2.findByIdAndUpdate( usuarioId, nuevoUsuario, { new: true } );

        res.json({
            ok: true,
            evento: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarUsuario = async( req, res = response ) => {
    // console.log(req.body.user.id)
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
    const usuarioId = req.body.user.id;


    try {

        const usuario = await Usuario2.findById( usuarioId );

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id',
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Usuario2.findByIdAndDelete( usuarioId );

        res.json({ ok: true, msg: 'Usuario Eliminado' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}