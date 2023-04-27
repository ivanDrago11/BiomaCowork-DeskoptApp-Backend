/*
    Event Routes
    /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios, crearUsuario, actualizarUsuario, obtenerUsuario, eliminarUsuario } = require('../controllers/users');

const router = Router();

router.get('/', getUsuarios );

router.post('/', crearUsuario);

router.put('/', actualizarUsuario);

router.delete('/', eliminarUsuario);

module.exports = router;
