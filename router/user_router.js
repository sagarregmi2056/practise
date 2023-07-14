const User = require('../model/user_model');




const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// bcrypt is use to hash password


router.post("/register",upload.single('nimage'), function (req, res) {
  console.log("data console check", req.body);
    const username1 = req.body.username;
    const email1 = req.body.email;
    const password1 = req.body.password;
    const userType1 = req.body.userType;
    const nimage =req.file.filename;
  
    if (!username1 ||  !email1 || !password1 || !userType1) {
      return res.status(422).json({ message: "empty data" });
    }
  
    //console check
    
  
    //password bcrypt
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password1, salt, function (err, hash) {
        // Store hash in your password DB.
        //converting object
        const user = new User({
          username: username1,
          email: email1,
          password: hash,
          userType: userType1,
          nimage:nimage,
        });
  
        user.save();
        //data save
        //response
        res.status(200).json({ message: "successful" });
      });
    });
  
    //object data
  });
  
  router.post("/login", function (req, res) {
  
    const email = req.body.email;
    const password = req.body.password;
  //email check database bata
    User.findOne({ email: email })
      .then(function (userdata) {
  //userdata database ko store
// check email false or true
  if(userdata==null){
    return res.status(403).json({message:"email doesnot matched"})
  }
  
        //password compare
        bcrypt.compare(password, userdata.password, function (err, result) {
          // res === true


          if(result==false){
            return res.status(403).json({message:"password doesnot matched"})

           
          }
          // creating token  
          var token = jwt.sign({userid:userdata._id }, 'secretkey');
          res.status(200).json({message:"succesful login",token:token,userType:userdata.userType})
        });
      })
      .catch(function (err) {
        res.status(500).json({error:err});
      });
  });
  
  // displaying user data from data base

  // user type user login gareyko ley matra use garna milxa
  // auth.verifyLogin,auth.verifyVip 
  // yo chai bich ma halni ho function ko agadi
  router.get('/userall',auth.verifyLogin,auth.verifyAdmin,function(req,res){
    User.find().then(function(data){
      res.status(200).json(data)
    }).catch(function(err){
      res.status(500).json({error:err})
    });
  })

  // api to delete user 
router.delete('/deleteuser/:id',function(req,res){
  const id = req.params.id;
  // mathi ko id params bata leyko
  User.deleteOne({_id:id}).then(function(result){
    res.status(200).json({message:"deleted successfully"})
  }).catch((function(err){
    res.status(500).json({error:err});
  }))

})


// update 

router.put('/updateuser/:id',(req,res)=>{
  const username= req.body.username;
const password = req.body.password;
const userType = req.body.userType;
const id = req.params.id;
const email = req.body.email;

// use updateOne({id}{username passsword userttype etc})
User.updateOne({_id:id},{username:username,email:email,password:password,userType:userType}).then(()=>{
  // const user = new User({username:username})
res.status(200).json({message:"updated successfully"});


}).catch((err)=>{
  res.status(500).json({error:err})
})

})
router.put("/logout", auth.verifyLogin, function (req, res) {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    if (logout) {res.send({msg : 'You have been Logged Out' });}
     else {
      res.send({msg:'Error'});
    }});
  });

  router.get("/UserSingle/:id",function(req,res){
    const id=req.params.id;
    User.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(er){
        res.status(500).json({error:er})
    })
  })
  



module.exports = router;