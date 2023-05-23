const { response } = require('express');
const Reserva = require('../models/Reserva');
const { validateBooking } = require('../helpers/validateBooking');
const dayjs = require('dayjs');
const { getPriceAndQR } = require('../helpers/getPriceQR');


const getReservas = async( req, res = response ) => {

    const reservas = await Reserva.find();

    res.json({
        ok: true,
        // reservas
        reservas
    });
}

const crearReserva = async ( req, res = response ) => {
    let reserva = new Reserva( req.body );
    // console.log(reserva)
    const reservas = await Reserva.find();
    const formato = 'YYYY-MM-DDTHH:mm';
    reserva.start = dayjs(reserva.start).format(formato);
    reserva.end = dayjs(reserva.end).format(formato);
    const { price, codigoQR } = getPriceAndQR(reserva.start, reserva.end, reserva.area , reserva.price );
    console.log(reservas)
    reservas.length === 0 ? recibido = {val: true, msg: 'Reserva Disponible'} : recibido = validateBooking(reserva.area, reserva.start, reserva.end,0, reservas);
        
    // console.log('Valor recibido: ' + recibido.msg); 
    reserva.price = price;
    reserva.codigoQR = codigoQR;
    // console.log('Reserva Abajo');
    // console.log(reserva)
    // console.log(reserva.start)
    // console.log(reserva.end)
    console.log(recibido.val);
    if (recibido.val) {
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
        
    }else{
        res.status(500).json({
            ok: recibido.val,
            // msg: 'Hable con el administrador'
            msg: recibido.msg
        });
    }
}

const actualizarReserva = async( req, res = response ) => {
    
    const reservaId = req.body.id;
    const resBody = req.body;

    try {
        const reserva = await Reserva.findById( reservaId );
        if ( !reserva ) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no existe por ese id'
            });
        }
        
        const reservas = await Reserva.find();
        console.log(reservas)
        const formato = 'YYYY-MM-DDTHH:mm';
        resBody.start = dayjs(resBody.start).format(formato);
        resBody.end = dayjs(resBody.end).format(formato);
        const { price, codigoQR } = getPriceAndQR(resBody.start, resBody.end, resBody.area , resBody.price );
        reservas.length === 0 ?  recibido = {val: true, msg: 'Reserva Disponible'} : recibido = validateBooking(resBody.area, resBody.start, resBody.end, reservaId, reservas);
        console.log(recibido.msg)
        resBody.price = price;
        resBody.codigoQR = codigoQR;


        // if ( usuario.email.toString() == email ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este usuario'
        //     });
        // }
        if (recibido.val) {
            
            const nuevaReserva = {
                ...resBody,
                id: reservaId
            }
    
            const reservaActualizada = await Reserva.findByIdAndUpdate( reservaId, nuevaReserva, { new: true } );
    
            res.json({
                ok: true,
                evento: reservaActualizada
            });
        }else{
            res.json({
                ok: false,
                evento: recibido.msg
            });
        }

        
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