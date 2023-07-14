const mongoose = require('mongoose');

 const connectdb=()=>{ mongoose.connect('mongodb://localhost:27017/funolympics',{
    useNewUrlparser:true,
    useUnifiedTopology:true,

 })
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log(err))
}
module.exports = connectdb;