const Router = require('express');
const verifyToken = require('../middleware/auth');

const router = Router();

const {inicio, login, usuarios} = require('../controllers/vistas.controller');


router.get('/login',login);
router.get('/home',verifyToken,inicio);
router.get('/usuarios',verifyToken,usuarios);


module.exports = router;