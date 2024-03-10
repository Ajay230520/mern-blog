import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    profilepicture:{
          type:String,
          default:"https://tse3.mm.bing.net/th?id=OIP.m_E2GiWXc8IGEeYAbypLgAHaHa&pid=Api&P=0&h=180",

    },
    },{timestamps:true} // when user created .

);

const User = mongoose.model('User',userSchema);

export default User;