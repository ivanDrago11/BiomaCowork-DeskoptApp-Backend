const { response } = require('express');
const Reserva = require('../models/Reserva');

const getReservas = async( req, res = response ) => {

    const reservas = await Reserva.find();

    res.json({
        ok: true,
        reservas
    });
}

const crearReserva = async ( req, res = response ) => {

    const reserva = new Reserva( req.body );

    try {
        
        const reservaGuardada = await reserva.save();

        res.json({
            ok: true,
            evento: reservaGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            // msg: 'Hable con el administrador'
            msg: 'Error al crear la reserva'
        });
    }
}

const actualizarReserva = async( req, res = response ) => {
    
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
       const reservaId = req.body.id;
    //    console.log(req.body);
    try {

        const reserva = await Reserva.findById( reservaId );

        if ( !reserva ) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no existe por ese id'
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este usuario'
        //     });
        // }

        const nuevaReserva = {
            ...req.body,
            id: reservaId
        }

        const reservaActualizada = await Reserva.findByIdAndUpdate( reservaId, nuevaReserva, { new: true } );

        res.json({
            ok: true,
            evento: reservaActualizada
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const eliminarReserva = async( req, res = response ) => {
    // console.log(req.body.user.id)
    // const usuarioId = req.params.id;
    // const uid = req.uid;
    // const email = req.email;
    console.log(req.body);
    let reservaId;
    try {
        if(req.body.reserva == undefined){
            reservaId = req.body.id;
        }else{
            reservaId = req.body.reserva.id;
        }
        console.log(reservaId)
        
    } catch (error) {
        console.log(error)
    }
    


    try {

        const reserva = await Reserva.findById( reservaId );

        if ( !reserva ) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no existe por ese id',
            });
        }

        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Reserva.findByIdAndDelete( reservaId );

        res.json({ ok: true, msg: 'Reserva Eliminada' });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva
}