const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }
        
        const { login, password } = req.body

        const candidate = await User.findOne({ login })
        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }

        const hashedPW = await bcrypt.hash(password, 12)
        const user = new User({
            login: login,
            password: hashedPW
        })

        await user.save()
        res.status(201).json({ message: 'Пользователь был создан' })

    })

// /api/auth/login
router.post(
    '/login',
    [
        check('password', 'введите пароль').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при авторизации'
            })
        }

        const { login, password } = req.body
        const user = await User.findOne({ login })
        if (!user) {
            return res.status(400).json({ message: 'Такой пользователь не был найден' })
        }
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Введенные данные неверны' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '60s' }
        )
        res.json({ token, userId: user.id,message:`Вы авторизовались, ${login}` })

    })

module.exports = router