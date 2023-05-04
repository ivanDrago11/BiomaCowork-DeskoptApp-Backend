
const { Router } = require('express');

const { loginCtrl} = require('../controllers/login');

const router = Router();

router.post('/', loginCtrl );

module.exports = router;
