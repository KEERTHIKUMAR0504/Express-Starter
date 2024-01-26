const express = require('express');
const { register, signin, signout, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const router = express.Router();


router.post('/register', register);
router.post('/signin', signin );
router.get('/signout', signout );
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;