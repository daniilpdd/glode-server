'use strict'
const { Router } = require('express')
const { check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post(
    '/login',
    [
        /** login validator **/
        check('login', 'Неверный логин').exists().notEmpty(),
        /** password validator **/
        check('pass', 'Неверный пароль').exists().notEmpty()
        //TODO add frontend form validation
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json( {
                    errors: errors.array(),
                    message: 'Неверные данные для авторизации'
                } )
            }

            const { login, pass } = req.body

            const user = await User.findOne({ login: login })

            if (!user) {
                return res.status(401).json({
                    message: 'Пользователь не найден'
                })
            }

            const validPass = bcrypt.compareSync(pass, user.pass)

            if (!validPass) {
                return res.status(401).json({
                    message: 'Неверный пароль'
                })
            }
               
            return res.status(200).json({ login: login })            
            
        }
        catch (e) {
            /** write server error to server-err.log **/
            console.error(e)
            /** send error code **/
            res.status(500).json({ message: 'Что то пошло не так' })
        }
})

router.post(
    '/reg',
    [
        /** login validator **/
        check('login', 'Неверный логин').exists().notEmpty(),
        /** password validator **/
        check('pass', 'Неверный пароль').exists().notEmpty()
        //TODO add frontend form validation
    ],
    async (req, res) => {
        try {
            
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json( {
                    errors: errors.array(),
                    message: 'Неверные данные для регистрации'
                } )
            }

            const { login, pass } = req.body

            let user = await User.findOne({login: login})

            if (user) {
                return res.status(401).json({ 
                    message: 'Пользователь уже существует'
                })
            }
             
            user = new User()
            user.login = login
            user.pass = bcrypt.hashSync(pass, 7)

            await user.save()

            return res.status(200).json({ login: login })            
        }
        catch (e) {
            /** write server error to server-err.log **/
            console.error(e)
            /** send error code **/
            res.status(500).json({ message: 'Что то пошло не так' })
        }
})

module.exports = router