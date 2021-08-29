import React from 'react'
import { useState, useEffect } from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router-dom'

export default function CreatePage() {
    const history = useHistory()
    const message = useMessage()
    const { request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '0',
        internet: '0',
        minutes: '0',
        sms: '0',
        speed: '0',
        channels: '0'
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const create_tarif = async (event) => {
        try {
            event.preventDefault()
            const data = await request('/api/tarifs/create_tarif', 'POST', { ...form })
            message(data.message)
            history.push('/tarifs')
        } catch (e) { }
    }

    return (
        <div>
            <h4>Создать тариф</h4>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s8">
                            <input id="name" name="name" type='text' className="validate" onChange={changeHandler} minLength="4"/>
                            <label htmlFor="name">Название</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="price" name="price" type="number" className="validate" onChange={changeHandler} min="1"/>
                            <label htmlFor="price">Цена</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="description" name="description" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="description">Описание</label>
                        </div>

                    </div>
                    <h5>Мобильная связь</h5>
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="internet" name="internet" type="number" className="validate" onChange={changeHandler} min="0"></input>
                            <label htmlFor="internet">Интернет(ГБ)</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="minutes" name="minutes" type="number" className="validate" onChange={changeHandler}  min="0"/>
                            <label htmlFor="minutes">Минуты</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="sms" name="sms" type="number" className="validate" onChange={changeHandler} min="0" />
                            <label htmlFor="sms">SMS</label>
                        </div>
                    </div>

                    <h5>Домашний интернет</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="speed" name="speed" type="number" className="validate" onChange={changeHandler}  min="1"/>
                            <label htmlFor="speed">Скорость(Мбит/с)</label>
                        </div>
                    </div>
                    <h5>Телевидение</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="channels" name="channels" type="number" className="validate" onChange={changeHandler}  min="0"/>
                            <label htmlFor="channels">Каналы</label>
                        </div>
                    </div>

                    <button onClick={create_tarif} className="btn waves-effect waves-light blue">Сохранить</button>
                </form>
            </div>
        </div>
    )
}
