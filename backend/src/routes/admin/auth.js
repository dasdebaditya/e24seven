const express = require('express')
const router = express.Router()

const AuthController = require('../../controller/admin/AuthController')

router.post('/admin/register', AuthController.register)
router.post('/admin/login', AuthController.login)

 

module.exports = router