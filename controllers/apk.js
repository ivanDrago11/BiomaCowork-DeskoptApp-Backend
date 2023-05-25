const { response } = require('express');
const Apk = require('../models/Apk');

const getApk = async( req, res = response ) => {

    const apk = await Apk.find();

    res.json({
        ok: true,
        apk,
        
    });
}

const crearApk = async ( req, res = response ) => {

    const apk = new Apk( req.body );

    try {
        
        const apkGuardada = await apk.save();

        res.json({
            ok: true,
            evento: apkGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            // msg: 'Hable con el administrador'
            msg: 'Error al crear el apk'
        });
    }
}

const actualizarApk = async( req, res = response ) => {
    
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
       const apkId = req.body.id;

    try {

        const apk = await Apk.findById( apkId );

        if ( !apk ) {
            return res.status(404).json({
                ok: false,
                msg: 'Apk no existe por ese id'
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este usuario'
        //     });
        // }

        const nuevaApk = {
            ...req.body,
            id: apkId
        }

        const apkActualizada = await Apk.findByIdAndUpdate( apkId, nuevaApk, { new: true } );

        res.json({
            ok: true,
            evento: apkActualizada
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarApk = async( req, res = response ) => {
    // console.log(req.body.user.id)
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
    const apkId = req.body.id;
    console.log(apkId)

    try {

        const apk = await Apk.findById( apkId );

        if ( !apk ) {
            return res.status(404).json({
                ok: false,
                msg: 'Apk no existe por ese id',
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Apk.findByIdAndDelete( apkId );

        res.json({ ok: true, msg: 'Apk Eliminada' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getApk,
    crearApk,
    actualizarApk,
    eliminarApk
}