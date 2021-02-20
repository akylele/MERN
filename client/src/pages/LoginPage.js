import React, {useState} from 'react'

import {useDispatch} from 'react-redux'
import {fetchLoginStart} from "../redux/actions/auth";
import {fetchRegisterStart} from "../redux/actions/register";


const LoginPage = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        login: '',
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
        <div className="row center-align ">
            <div className="col l6 xl4 m6 s12 offset-l3 offset-xl4 offset-m3">
                <h5>Авторизация/Регистрация</h5>
                <div className="card blue darken-1 ">
                    <div className="card-content white-text">
                        <span className="card-title">Auth/Reg</span>
                        <div>

                            <div className="input-field">
                                <input id="login" type="text" className="validate white-input" name="login"
                                       onChange={changeHandler}/>
                                <label htmlFor="login">login</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" className="validate white-input" name="password"
                                       onChange={changeHandler}/>
                                <label htmlFor="password">password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} className="btn yellow darken-4 marginright">Войти</button>
                        <button onClick={registerHandler} className="btn grey lighten-1  white-text">регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
