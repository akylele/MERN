import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../context/auth.context'

function Navbar({ isAuthentificated }) {
    const auth = useContext(AuthContext)

    if (!isAuthentificated) {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue">
                        <a href="#!" className="brand-logo marginleft">Подобрать тариф</a>
                        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><NavLink activeClassName="isActive" to="/select">Подобрать тариф</NavLink></li>
                            <li><NavLink activeClassName="isActive" to="/tarifs">Тарифы ({auth.len})</NavLink></li>
                            <li><NavLink activeClassName="isActive" to="/auth">Войти</NavLink></li>
                            <li><NavLink activeClassName="isActive" to="/loading">loading</NavLink></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><NavLink activeClassName="isActiveMobile" to="/select">Подобрать тариф</NavLink></li>
                    <li><NavLink activeClassName="isActiveMobile" to="/tarifs">Тарифы ({auth.len})</NavLink></li>
                    <li><NavLink activeClassName="isActiveMobile" to="/auth">Войти</NavLink></li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#!" className="brand-logo marginleft">Подбор</a>
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink activeClassName="isActive" to="/select">Подобрать тариф</NavLink></li>
                        <li><NavLink activeClassName="isActive" to="/tarifs">Тарифы ({auth.len})</NavLink></li>
                        <li><NavLink activeClassName="isActive" to="/create">Создать</NavLink></li>
                        <li><NavLink activeClassName="isActive" to="/deltarifs">Редактирование</NavLink></li>
                        <li><NavLink activeClassName="isActive" to="/logout">Выйти</NavLink></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                 <li><NavLink activeClassName="isActiveMobile" to="/select">Подобрать тариф</NavLink></li>
                <li><NavLink activeClassName="isActiveMobile" to="/tarifs">Тарифы ({auth.len})</NavLink></li>
                <li><NavLink activeClassName="isActiveMobile" to="/create">Создать тариф</NavLink></li>
                <li><NavLink activeClassName="isActiveMobile" to="/deltarifs">Редактирование</NavLink></li>
                <li><NavLink activeClassName="isActiveMobile" to="/logout">Выйти</NavLink></li>
            </ul>
        </div>

    )
}

export default Navbar