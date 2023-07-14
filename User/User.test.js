const User= require('../model/user_model');
const mongoose=require('mongoose');
// const Destination=require('../modules/destinationModel')
const url= 'mongodb://127.0.0.1:27017/sagar';

// use the new name of the databaseconsturl= 'mongodb://localhost:27017/new_database_name';
beforeAll(async() =>{
await mongoose.connect(url, {
useNewUrlParser: true,
// useCreateIndex: true,
useUnifiedTopology : true
});
});

afterAll(async() =>{
    await mongoose.connection.close();
});
// the code below is for insert testing

// describe('Product  Schema testanything', () =>{
// it('Add product testinganything', () =>{
// const user= {
//     'username':'Nokia233',
//     'image':'sda3',
//     'email':'nokia@gmail.com',
//     'password':'Nokia',
//     'userType':'User'


// };
//     return User.create(user)
// 	    .then((pro_ret) =>{
// 	        expect(pro_ret.username).toEqual('Nokia233');
//         });
// });


// // //  it('to test the delete product is working or not', async() =>{
// // //         const status= await User.findOneAndDelete({_id:Object('6499aa4bb2320eada6ceab93')});
// // //         expect(status.ok).toBe(1);
// });


//  it('to test the update', async() =>{
//     return User.findOneAndUpdate({_id :Object('64a18931ef8482375fc17f3b')},{$set :{username:'Nokia'}})
// 	.then((pp)=>{
//         expect(pp.username).toEqual('Nokia')
//     })
// });
// //the code below is for delete testing

it('to test the delete product is working or not', async() =>{
    const status= await User.deleteMany();
    expect(status.acknowledged).toBe(true);
});

// //test
// describe('Destination Schema testanything', () =>{// the code below is for insert testing
// it('Add Destination testinganything', () =>{
// const Destinat= {
//     'From':'Nokia',
//     'To':'sda',
//     'Date':'asda',
//     'Time':'sadas',
//     'People':'asdsa',
//     'seat':'asd'

// };
//     return Destination.create(Destinat)
// 	    .then((pro_ret) =>{
// 	        expect(pro_ret.From).toEqual('Nokia');
//         });
// });
// })