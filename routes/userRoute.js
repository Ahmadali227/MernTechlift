const express = require('express');

const { loginController, registerController } = require('../controllers/userController');

const router = express.Router();

//post ||login

router.post('/login', loginController)
// router.get('/login', (req, res) => {
//   console.log("hello");
//   res.send("coming out of controller")
// })

//post ||register
router.post('/register', registerController)
module.exports = router;

