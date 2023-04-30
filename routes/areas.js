/*
    Event Routes
    /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getAreas, crearArea, actualizarArea, eliminarArea } = require('../controllers/areas');

const router = Router();

router.get('/', getAreas );

router.post('/', crearArea);

router.put('/', actualizarArea);

router.delete('/', eliminarArea);

module.exports = router;
