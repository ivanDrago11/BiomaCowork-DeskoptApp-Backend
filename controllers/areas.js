const { response } = require('express');
const Area = require('../models/Area');

const getAreas = async( req, res = response ) => {

    const areas = await Area.find();

    res.json({
        ok: true,
        areas
    });
}

const crearArea = async ( req, res = response ) => {

    const area = new Area( req.body );

    try {
        
        const areaGuardada = await area.save();

        res.json({
            ok: true,
            evento: areaGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            // msg: 'Hable con el administrador'
            msg: 'Error al crear el area'
        });
    }
}

const actualizarArea = async( req, res = response ) => {
    
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
       const areaId = req.body.id;

    try {

        const area = await Area.findById( areaId );

        if ( !area ) {
            return res.status(404).json({
                ok: false,
                msg: 'Area no existe por ese id'
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este usuario'
        //     });
        // }

        const nuevaArea = {
            ...req.body,
            id: areaId
        }

        const areaActualizada = await Area.findByIdAndUpdate( areaId, nuevaArea, { new: true } );

        res.json({
            ok: true,
            evento: areaActualizada
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarArea = async( req, res = response ) => {
    // console.log(req.body.user.id)
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
    const areaId = req.body.area.id;


    try {

        const area = await Area.findById( areaId );

        if ( !area ) {
            return res.status(404).json({
                ok: false,
                msg: 'Area no existe por ese id',
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Area.findByIdAndDelete( areaId );

        res.json({ ok: true, msg: 'Area Eliminada' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getAreas,
    crearArea,
    actualizarArea,
    eliminarArea
}