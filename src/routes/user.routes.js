const Router = require('express');
const verifyToken = require('../middleware/auth');
const {getUser, getUsers, addUser, updateUser, deleteUser} = require('../controllers/user.controller');

const router = Router();


router.get('/',verifyToken,getUsers);
router.get('/:id',verifyToken,getUser);
router.post('/',verifyToken,addUser);
router.put('/:id',verifyToken,updateUser);
router.post('/:id',verifyToken,deleteUser);


module.exports = router;