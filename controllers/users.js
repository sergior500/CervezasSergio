const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const getUsers= async(req,res) =>{
    const { limit=5, skip=0} = req.query;
    const users = await User.find({isActive: true}).limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, users})
}

const addUser = async(req, res) => {

    const { name, email, password, rol} = req.body;

    // Encriptar la contraseña
    const user = new User({name, email, password, rol})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

const deleteUser = async(req,res) => {
    const id = req.params.id;
    const removed = await User.findByIdAndRemove(id);
    res.json(removed);
}

const editUser = async(req,res) => {
    const id = req.params.id;
    const bodyReq = req.body
    const removed = await User.findByIdAndUpdate(id,bodyReq);
    res.json(removed);
}



module.exports = {getUsers,addUser, deleteUser,editUser}