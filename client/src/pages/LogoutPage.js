import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/auth.context'
export default function LogoutPage() {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <div className="center center-align">
            <h5>Вы точно хотите выйти?</h5><br></br>
            <div className="card-action flex_logout">
                <button type="submit" onClick={logoutHandler} className="btn blue">yes</button>
                <button type="submit" onClick={() => { history.push('/') }} className="btn red">no</button>
            </div>
        </div>
    )
}










