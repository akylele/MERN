const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPW = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            password: hashedPW
        })

        await user.save()
        res.status(201).json({message: 'Пользователь был создан'})

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

        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).json({message: 'Такой пользователь не был найден'})
        }
        const {
            id,
            name,
            surname,
            birthday,
            age,
            phone,
            email,
            photo
        } = user
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Введенные данные неверны'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '60s'}
        )
        res.json({
            token,
            id,
            message: `Вы авторизовались, ${email}`,
            name,
            surname,
            age,
            phone,
            email,
            birthday,
            photo
        })

    })

router.post(
    '/edit',
    [
        check('email', 'введите email').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при редактировании'
            })
        }

        const {
            id,
            name,
            surname,
            birthday,
            age,
            phone,
            email,
        } = req.body

        await User.updateOne({
            _id: id
        }, {
            id,
            name,
            surname,
            birthday,
            age,
            phone,
            email,
        })
            .then(async () => {
                const user = await User.findOne({_id: req.body.id})
                res.status(200).json({
                    id: user._id,
                    age: user.age,
                    birthday: user.birthday,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    phone: user.phone,
                    surname: user.surname,
                    message: 'Успешное изменение'
                })
            })
            .catch(() => {
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Изменение не удалось'
                })
            })
    })

module.exports = router