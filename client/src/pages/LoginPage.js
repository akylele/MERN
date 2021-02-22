import React, {useState} from 'react'

import {useDispatch} from 'react-redux'
import {fetchLoginStart} from "../redux/actions/auth";
import {fetchRegisterStart} from "../redux/actions/register";


const LoginPage = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        dispatch(fetchRegisterStart(form))
    }

    const loginHandler = async () => {
        dispatch(fetchLoginStart(form))
    }

    return (
        <div className="row center-align">
            <div className="col l6 xl4 m6 s12 offset-l3 offset-xl4 offset-m3">
                <div className="card darken-1 ">
                    <div className="card-content white-text">
                        <h5 className="card-title black-text">Авторизация/Регистрация</h5>
                        <div>
                            <div className="input-field">
                                <input id="email" type="text" className="validate black-input" name="email"
                                       onChange={changeHandler}/>
                                <label htmlFor="email">email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" className="validate black-input" name="password"
                                       onChange={changeHandler}/>
                                <label htmlFor="password">password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} className="btn yellow darken-4">Войти</button>
                        <button onClick={registerHandler} className="btn grey darken-3  white-text">Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage