const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')

const   findUser = async(req =request,res = response) => {
    const {email , password} = req.body
    try {
        
        const user = await User.findOne({email})
        const validPassword = bcryptjs.compareSync(password, user.password) 

        if(!user){
            res.status(401)({ 
                message: `User/Password incorrect - email`
             })
            
        }else if (!bcryptjs.compareSync(password,user.password)) {
            res.json({ message: `La contraseña no es correcta` })
        }else if(!user.isActive){
            res.json({ message: `El usuario esta inactivo` })
        }else if(!validPassword){
            res.status(401).json({
                msg: 'User/password incorrect - password'
            })
        }else{
            const token = await genJWT(user._id);
        res.json({
            user,
            token
        }        
        )
        }
        
    } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error en el servidor consulte con el administrador'
            })
    }
}



module.exports = {findUser}