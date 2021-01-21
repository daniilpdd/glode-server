'use strict'
const { Router } = require('express')
const router = Router()
const Lamp = require('../models/Lamp')
const User = require('../models/User')

router.post(
    '/add',
    async (req, res) => {
        try {
            const { lampId, lampType, login, list } = req.body

            const user = await User.findOne({ login: login })

            const candidate = await Lamp.findOne({ lampId: lampId })

            if (!user) {
                return res.status(401).json({
                    message: 'Пользователь не найден'
                })
            }
            
            if (candidate) {
                return res.status(401).json({
                    message: 'Лампа с так идентификатором уже существует'
                })
            }
            
            const lamp = new Lamp()
            lamp.lampId = lampId
            lamp.lampType = lampType
            lamp.userId = user.id
            lamp.list = list

            await lamp.save()
            
            return res.status(200).json({ message: 'Лампа добавлена в список устройств пользователя' })     
        }
        catch (e) {
            console.error(e)
            res.status(500).json({ message: 'Что то пошло не так' })
        }
})

router.post(
    '/getall',
    async (req, res) => {
        try {

            const { login } = req.body

            const user = await User.findOne({ login: login })

            if (!user) {
                return res.status(401).json({
                    message: 'Пользователь не найден'
                })
            }
        
            const lamps = await Lamp.find({ userId: user.id })

            res.status(200).json(lamps)
        }
        catch (e) {
            console.error(e)
            res.status(500).json({ message: 'Что то пошло не так' })
        }
})

router.post(
    '/remove',
    async (req, res) => {
        try {

            const { lampId } = req.body

            const lamp = await Lamp.findOne({ lampId: lampId })

            if (!lamp) {
                return res.status(401).json({
                    message: 'Лампа с так идентификатором не существует'
                })
            }

            await lamp.delete()

            res.status(200).json({ message: 'Лампа успешно удалена' })
        }
        catch (e) {
            console.error(e)
            res.status(500).json({ message: 'Что то пошло не так' })
        }
})

module.exports = router