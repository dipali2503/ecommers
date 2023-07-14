const {Router} = require ('express')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const User = require('../models/user')
let express = require('express');
let app = express();
const router = Router();

// For POST-Support
let bodyParser = require('body-parser');
// let multer = require('multer');
// let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', (req,res)=>{
  console.log(req.name);
  // let email = req.body.email
  // let password = req.body.password
  // let name = req.body.name

  // const salt = await bcrypt.genSalt(10)

  // const hashedPassword = await bcrypt.hash(password,salt)

  // const user = new User ({
  //   name: name,
  //   email:email,
  //   password:password
  // })

  // const result = await user.save()

  // res.json({
  //   user:result
  // })
  res.send(" created user")

});

// router.post('/login',async(req,res)=>{
//   res.send(" created user")
// })
// router.get('/user', (req,res)=>{
//   res.send("user")
// })

module.exports = router
