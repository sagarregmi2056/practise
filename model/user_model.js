const mongoose = require('mongoose');


const User = mongoose.model('user',{
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nimage:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true

    },
    userType:{
        type:String,
        enum:['User','Admin','Vip']
    }
})

module.exports = User;