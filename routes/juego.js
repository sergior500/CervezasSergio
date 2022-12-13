const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const { getJuego, postJuego, getJuegos, deleteJuego, editJuego } = require('../controllers/juego')
const { isAdminRolorSellRol } = require('../middleware/validateRol')

router.get('/', getJuegos)
router.get('/:id', getJuego)
router.post('/',
    check('Titulo').notEmpty(),
    check('Descripción').notEmpty(),
    check('Puntuación').notEmpty(),
    check('Precio').notEmpty(),
isAdminRolorSellRol

, postJuego)
router.delete('/:id'
,isAdminRolorSellRol
,deleteJuego)
router.put('/:id',
    check('Titulo').notEmpty(),
    check('Descripción').notEmpty(),
    check('Puntuación').notEmpty(),
    check('Precio').notEmpty(),
isAdminRolorSellRol
, editJuego)

module.exports = router