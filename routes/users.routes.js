const express = require('express');
const router = express.Router();
const Users = require('../models/users.model');
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/user.controller');
const { isAuth } = require('../utils/authentication');
const { isAdmin } = require('../utils/authorization');



router.get('/users',isAuth, isAdmin ,getAllUsers);
router.get('/users/:userId', isAuth, getUserById);
router.put('/users/:userId',isAuth, updateUser);
router.delete('/users/:userId', isAuth, deleteUser);


module.exports = router;