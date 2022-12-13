const express = require('express')
const router = express.Router()
const { findUser } = require('../controllers/login')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')


router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('password', 'El password debe de ser más de 6 letras').not().isEmpty(),
    validateFields
],
findUser
)

module.exports = router