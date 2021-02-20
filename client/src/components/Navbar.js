import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ isAuthentificated }) {


    if (!isAuthentificated) {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue">
                        <a href="#!" className="brand-logo marginleft">main</a>
                        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><NavLink activeClassName="isActive" to="/login">Войти</NavLink></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><NavLink activeClassName="isActiveMobile" to="/login">Войти</NavLink></li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#!" className="brand-logo marginleft">main</a>
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink activeClassName="isActive" to="/logout">Выйти</NavLink></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><NavLink activeClassName="isActiveMobile" to="/logout">Выйти</NavLink></li>
            </ul>
        </div>

    )
}

export default Navbar