

const AuthSchema = require('../models/auth.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




const register = async(req,res) => {
    try{
       const {username, password, email} = req.body;
       
       const user = await AuthSchema.findOne(email)

       if(user){
        return res.status(500).json({msg: "Böyle bir kullanıcı zaten var!"})
       }
       if(password.length < 6){
        return res.status(500).json({msg: "Şifreniz 6 karakterden küçük olmamalı!"})
       }
       
       const passwordHash = await bcrypt.hash(password,12);

       if(!isEmail(email)){
        return res.status(500).json({msg: "Email formatı dışında bir şeyler girdiniz..."})
       }
      
       const newUser = await AuthSchema.create({username, email, password: passwordHash})

       const token = jwt.sign({id: newUser._id},"SECRET_KEY", {expiresIn: '1h'})

       res.status(201).json({
        status:"OK",
        newUser,
        token
       })

    } catch(error) {
        return res.status(500).json({msg: error.message})

    }
}

const login = async(req,res) => {
    try{

    } catch(error) {

    }
}


  function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex))
    return true;

    else
    return false;
  }

module.exports = {register, login}
