const { Schema, model } = require('mongoose');

const JuegoSchema = Schema({
    Titulo: {
        type: String,
        required: [true, 'El Titulo es obligatorio'],
        unique: true
    },
    Descripción: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    Puntuación: {
        type: String,
        required: [true, 'La puntuación es obligatoria'],
    },
    Precio: {
        type: String,
        required: true
    },isActive: {
        type: Boolean,
        default: true,
    }
});



module.exports = model( 'Juego', JuegoSchema );