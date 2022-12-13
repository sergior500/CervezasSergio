const { response, request } = require('express');
const Juego = require('../models/juego');

const getJuegos = async(req = request, res = response)=>{
    const { limit=5, skip=0} = req.query;
    const juegos = await Juego.find({isActive: true}).limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, juegos})
}

const getJuego = (req = request, res = response )=>{
    const id = req.params.id
    const juego = Juego.findById(id);

    if (juego.length) {
        res.json(juego)
    } else {
        res.json({ message: `El juego con ${id} no existe` })
    }
    
}

const postJuego = async(req = request, res = response)=>{
    const { Titulo, Descripción, Puntuación, Precio} = req.body;
    const juego = new Juego({ Titulo, Descripción, Puntuación, Precio});


    // Guardar en BD
    await juego.save();

    res.json({
        juego
    });
}

function deleteJuego(req = request, res = response) {
    const juegoId = req.params.id;
    const removed = Juego.findByIdAndDelete(juegoId);
    res.json(removed);
}

const editJuego = async(req,res) => {
    const id = req.params.id;
    const bodyReq = req.body
    const removed = await User.findByIdAndUpdate(id,bodyReq);
    res.json(removed);
}

module.exports = {getJuego,getJuegos,postJuego ,deleteJuego, editJuego}