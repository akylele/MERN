const { Router } = require('express')
const Tarif = require('../models/Tarif')
const router = Router()
const { check, validationResult } = require('express-validator')

router.post('/del_tarif', async (req, res) => {
    try {
        const { id,name } = req.body
        await Tarif.deleteOne({ _id: id })
        res.status(200).json({ message: `Вы удалили тариф "${name}"` })
    } catch (e) {
        res.status(500).json({ message: 'Вы не смогли удалили тариф' })
    }
})

router.post('/null_tarif', async (req, res) => {
    try {
        const { id, name } = req.body
        await Tarif.updateOne({
            _id: id
        },{Likes:0})
        res.status(200).json({ message: `Вы обнулили тариф "${name}"` })
    } catch (e) {
        res.status(500).json({ message: 'Вы не смогли обнулить тариф' })
    }
})

router.get('/', async (req, res) => {
    const tarifs = await Tarif.find({}).lean()
    return res.json(tarifs)
})

router.post('/create_tarif', [
    check('name', 'Минимальная длина 4 символа').isLength({ min: 4 })
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Неккоректные данные при заполнении форм'
        })
    }

    const { name, description, price, internet, minutes, sms, speed, channels } = req.body

    try {
        const tarif = new Tarif({
            Name: name,
            Description: description,
            Price: price,
            MBInternet: internet,
            MBMinutes: minutes,
            MBSms: sms,
            HISpeed: speed,
            TChannels: channels,
            Likes:0
        })
        await tarif.save()
        res.status(200).json({ message: 'Вы добавили тариф' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.get('/account', async (req, res) => {

    res.render('account', {
        title: 'About me',
        isAbout: true,
    })
})

router.post('/liked', async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.body
        await Tarif.updateOne({
            _id: id
        },{$inc:{Likes:1}}).lean()
        res.status(200).json({ message: 'Спасибо за оценку' })
    } catch (e) {
        console.log(e)
    }

})


router.post('/pick_up', async (req, res) => {
    let price1, price2, internet1, internet2, minutes1, minutes2, sms1, sms2, home_internet1, television1, home_internet2, television2
    try {
        req.body.find(function (obj) {
            if (obj.name == 'price1') {
                price1 = obj.value
            }
            if (obj.name == 'price2') {
                price2 = obj.value
            }
            if (obj.name == 'internet1') {
                internet1 = obj.value
            }
            if (obj.name == 'internet2') {
                internet2 = obj.value
            }
            if (obj.name == 'minutes1') {
                minutes1 = obj.value
            }
            if (obj.name == 'minutes2') {
                minutes2 = obj.value
            }
            if (obj.name == 'sms1') {
                sms1 = obj.value
            }
            if (obj.name == 'sms2') {
                sms2 = obj.value
            }
            if (obj.name == 'Hinternet1') {
                home_internet1 = obj.value
            }
            if (obj.name == 'Hinternet2') {
                home_internet2 = obj.value
            }
            if (obj.name == 'Television1') {
                television1 = obj.value
            }
            if (obj.name == 'Television2') {
                television2 = obj.value
            }
        })
        if (price1 === undefined || price1 === '') {
            price1 = 0
        }
        if (internet1 === undefined || internet1 === '') {
            internet1 = 0
        }
        if (minutes1 === undefined || minutes1 === '') {
            minutes1 = 0
        }
        if (sms1 === undefined || sms1 === '') {
            sms1 = 0
        }
        if (price2 === undefined || price2 === '') {
            price2 = Infinity
        }
        if (internet2 === undefined || internet2 === '') {
            internet2 = Infinity
        }
        if (minutes2 === undefined || minutes2 === '') {
            minutes2 = Infinity
        }
        if (sms2 === undefined || sms2 === '') {
            sms2 = Infinity
        }
        if (home_internet1 === undefined || home_internet1 === '') {
            home_internet1 = 0
        }
        if (home_internet2 === undefined || home_internet2 === '') {
            home_internet2 = Infinity
        }
        if (television1 === undefined || television1 === '') {
            television1 = 0
        }
        if (television2 === undefined || television2 === '') {
            television2 = Infinity
        }


        const tarifs = await Tarif.find({
            Price: {
                $gte: price1,
                $lte: price2
            },
            MBInternet: { $gte: internet1, $lte: internet2 },
            MBMinutes: { $gte: minutes1, $lte: minutes2 },
            MBSms: { $gte: sms1, $lte: sms2 },
            HISpeed: { $gte: home_internet1, $lte: home_internet2 },
            TChannels: { $gte: television1, $lte: television2 }
        }).sort({Likes:-1}).lean()
        if (tarifs.length > 0) {
            res.status(200).json({ message: 'Тариф(ы) подбирается, посмотрите ниже', tarifs })
        } else {
            res.status(200).json({ message: 'Нет подходящего тарифа' })
        }

    } catch (e) {
        res.status(500).json({ message: 'Тариф не подбирается', error: e.message })
    }
})

module.exports = router