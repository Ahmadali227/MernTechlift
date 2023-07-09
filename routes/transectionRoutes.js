const express = require('express');
const { addTransection,getAllTransection,editTransection ,deleteTransection } = require('../controllers/transectionCtrl');


const router = express.Router();

//routes
//add transections
router.post('/add-transection',addTransection);

//add transections
router.post('/edit-transection',editTransection)

//delete transections
router.post('/delete-transection',deleteTransection)


//get transection
router.post('/get-transection',getAllTransection);
//post ||login

// router.post('/login', loginController)
// router.get('/login', (req, res) => {
//   console.log("hello");
//   res.send("coming out of controller")
// })

//post ||register
// router.post('/register', registerController)
module.exports = router;

