const express = require('express')
const router = express.Router()
const { addUser , deleteUser, editUser, getUsers} = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isValidRol, emailExist,userExist} = require('../helpers/db-validators')
const { findUser } = require('../controllers/login')
const { isAdminRol, hasRol } = require('../middleware/validateRol')
const { validateJWT } = require('../middleware/validateJWT')

router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/',[
    check('email','Email is invalid').isEmail(),
    check('email').custom(emailExist),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol),
    validateFields
] ,addUser)

router.delete('/:id',[
    validateJWT,
    hasRol('ADMIN-ROL','DELETE-ROL','USER-ROL'),
    isAdminRol,
    check('id').custom(userExist),
    check('id',"El id no es correcto").isMongoId(),
    validateFields
],deleteUser)
 router.put('/:id',[
    check('id').custom(userExist),
    check('id',"El id no es correcto").isMongoId(),
    validateFields
 ],editUser)

module.exports = router