
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getReservas, crearReserva, actualizarReserva, eliminarReserva } = require('../controllers/reservas');

const router = Router();

router.get('/', getReservas );

router.post('/', crearReserva);

router.put('/', actualizarReserva);

router.delete('/', eliminarReserva);

module.exports = router;
