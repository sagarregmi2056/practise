// this is for the authentication of the user

const jwt = require('jsonwebtoken');
const User = require('../model/user_model');

// user ko lagi authorization
module.exports.verifyLogin= function(req,res,next){
    try{
      
        
        
        const auth_header =req.headers.authorization;

        const token=auth_header.split(' ')[1];

        var decoded = jwt.verify(token,'secretkey');
       
        User.findOne({_id:decoded.userid}).then(function(userresult){
            req.userInfo= userresult;
            next();
        })
        .catch(function(err){
            res.status(401).json({error:err});
        })

    }
    catch (error){
     res.status(500).json({message:error});
    }
}

// admin ko lagi authorization

module.exports.verifyAdmin= function(req,res,next){

    // console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.userType!=="Admin"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}



module.exports.verifyVip= function(req,res,next){
    console.log("check username",req.userInfo.userType);
    if(!req.userInfo){
        return res.status(401).json({message:"invalid users"})
    }
    else if(req.userInfo.userType!=="Vip"){
        return res.status(401).json({message:"unathorized"});
    }
    next();
}

