/*
    Event Routes
    /api/users
*/
const { Router } = require('express');

const { getApk, crearApk, actualizarArea, eliminarApk } = require('../controllers/apk');

const router = Router();

router.get('/', getApk );

router.post('/', crearApk);

router.delete('/', eliminarApk);

module.exports = router;
