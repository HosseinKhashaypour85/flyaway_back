const express = require('express');
const router = express.Router();
const {getAllUsers , createUser} = require('../controllers/userController');

router.get('/users' , getAllUsers)
router.post('/users/create' , createUser);


module.exports = router;