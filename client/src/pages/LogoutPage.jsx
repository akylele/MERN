import React from 'react'
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom'

import {fetchLogoutStart} from "../redux/actions/auth";


export default function LogoutPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const handlerConfirm = () => {
        dispatch(fetchLogoutStart())
    }
    const handlerCancel = () => {
        history.push('/')
    }
    return (
        <div className="center center-align">
            <h5>Вы точно хотите выйти?</h5><br></br>
            <div className="card-action flex_logout">
                <button type="submit" onClick={handlerConfirm} className="btn blue">Да</button>
                <button type="submit" onClick={handlerCancel} className="btn red">Отмена</button>
            </div>
        </div>
    )
}










