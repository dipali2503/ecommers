const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const routes = require("./routes/routes");
var cors = require("cors");
var cookieParser = require("cookie-parser");
// const bcrypt = require('bcrypt');
let bodyParser = require("body-parser");
const Product = require("./models/product");

const app = express();
app.use(routes);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4204"],
  })
);
app.use(cookieParser());

app.use(express.json());

// app.use("api",routes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register_user", async (req, res) => {
  // console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const record = await User.findOne({ email: email });

  if (record) {
    return res.status(400).send({
      message: "Email is already Registered",
    });
  } else {
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      status: 'active',
      type: 'user'
    });

    const result = await user.save();

    const {_id} = await result.toJSON()
    const  token  =jwt.sign({_id:_id},"secret key")

    res.cookie("jwt",token,{
      httpOnly:true,
      maxAge: 24*60*60*1000
    })

    res.send({
      message:"success"
    })
  }
});

app.post("/register_admin", async (req, res) => {
  // console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const record = await User.findOne({ email: email });

  if (record) {
    return res.status(400).send({
      message: "Email is already Registered",
    });
  } else {
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      status: 'active',
      type: 'admin'
    });

    const result = await user.save();

    const {_id} = await result.toJSON()
    const  token  =jwt.sign({_id:_id},"secret key")

    res.cookie("jwt",token,{
      httpOnly:true,
      maxAge: 24*60*60*1000
    })

    res.send({
      message:"success"
    })

    res.json({
      user: result,
    });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email})

  if (!user) {
    return res.status(404).send({
      message:"User Not Found"
    })
  }

  if (!(await bcrypt.compare(req.body.password,user.password))) {
    return res.status(400).send({
      message:"Password is Incorrect"
    });
  }

  if (user.type === 'admin') {
    return res.status(400).send({
      message:"Please use User Credentails"
    });
  }

  if (user.status === 'inactive') {
    return res.status(400).send({
      message:"Please contact your admin you account is inactive"
    });
  }

  const token = jwt.sign({_id:user._id}, "secret key")

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:24*60*60*1000  // for 1 day
  })

  res.send({
    message: "success"
  })
});

app.post("/login_admin", async (req, res) => {
  const user = await User.findOne({email: req.body.email})

  if (!user) {
    return res.status(404).send({
      message:"User Not Found"
    })
  }

  if (!(await bcrypt.compare(req.body.password,user.password))) {
    return res.status(400).send({
      message:"Password is Incorrect"
    });
  }

  if (user.type === 'user') {
    return res.status(400).send({
      message:"Please use Admin Credentails"
    });
  }

  const token = jwt.sign({_id:user._id}, "secret key")

  res.cookie("jwt", token,{
    httpOnly:true,
    maxAge:24*60*60*1000  // for 1 day
  })

  res.send({
    message: "success"
  })
});

app.post("/logout", async (req, res) => {
  res.cookie("jwt", "", {maxAge:0})
  // console.log(res);
  res.send({
    message: "success"
  })
});

app.get("/user", async(req, res) => {
  try{
    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie,"secret key")

    // console.log('claims', claims);
    if (!claims) {
      return res.status(401).send({
        message:"unauthenticated"
      })
    }
    const user = await User.findOne({_id:claims._id})
    // console.log(user);

     const {password,...data} = await user.toJSON()
     res.send(data)
  } catch(err) {
    return res.status(401).send({
      message:'unauthenticated'
    })
  }
});

// app.get("getUser", async(req,res) => {
//   try{
//     const cookie = req.cookies['jwt']
//     const claims = jwt.verify(cookie,"secret key")

//     // console.log('claims', claims);
//     if (!claims) {
//       return res.status(401).send({
//         message:"unauthenticated"
//       })
//     }
//     const user = await User.findOne({_id:claims._id})
//     // console.log(user);

//      const {password,...data} = await user.toJSON()
//      res.send(data)
//   } catch(err) {
//     return res.status(401).send({
//       message:'unauthenticated'
//     })
//   }
// })

app.get("/products", async(req,res) => {
  const products = await Product.find().then(function (users) {
    // console.log(users);
    res.send(users);
    });;
});

app.get("/allUsers", async(req,res) => {
  const user = await User.find().then(function (users) {
    // console.log(users);
    res.send(users);
    });;
});

app.post("/update_price", async(req,res) => {
  console.log(req.body.id);
  const updated = await Product.updateOne({'_id': req.body.id}, {price: req.body.price}, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).clone().catch(function(err){ console.log(err)});
});

app.post("/update_tag", async(req,res) => {
  console.log(req.body.id);
  const updated = await Product.updateOne({'_id': req.body.id}, {tag: req.body.tag}, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).clone().catch(function(err){ console.log(err)});
});

app.post("/update_status", async(req,res) => {
  const updated = await User.updateOne({'_id': req.body.id}, {status: req.body.status}, function(
    err,
    result
    ) {
      if (err) {
        res.send(err);
        console.log(req.body.status);
    } else {
      res.send(result);
    }
  }).clone().catch(function(err){ console.log(err)});
});

app.post("/addToCart", async(req,res) => {
  console.log(req.body);
  const updated = await User.updateOne({'_id': req.body.id}, { $push : {cart: req.body.cart}},{ upsert: true, new: true }, async(
    err,
    result
  ) => {
    if (err) {
      res.send(err);
    } else {
     const user = await User.findOne({_id:req.body.id})
     const {password,...data} = await user.toJSON()
      res.send(data.cart);
    }
  }).catch((err) => new Error(err));
})

app.post("/deleteCart", async(req,res) => {
  console.log(req.body);
  const updated = await User.updateOne({'_id': req.body.id}, { $pull : {cart: {_id: req.body._id}}}, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }).catch((err) => new Error(err));
})

mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the Database");
    app.listen(5000, () => {
      console.log(" App is listning on port 5000 ");
    });
  });
