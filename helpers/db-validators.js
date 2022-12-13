const Rol = require('../models/rol')
const User = require('../models/usuario')

const emailExist = async (email = '') =>{
	const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        return res.status(400).json({
            "msg": "Email already exists"
        })
    }
}

const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

const userExist = async(id = '')=> {
    const user = await User.findById(id)
        if(!user) {
            throw new Error(`No existe el id`)
        }
}

module.exports = { isValidRol, emailExist, userExist}