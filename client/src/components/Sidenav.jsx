import React from 'react'
import placeholderPhoto from "../images/sunset-scenery-minimal-4k-green.jpg";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Sidenav = () => {
    const isAuth = !!useSelector(store => store.authReducer.profile.token)
    const profile = useSelector(store => store.authReducer.profile)

    return (
        <>
            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={placeholderPhoto} style={{width: '100%'}}/>
                        </div>
                        {isAuth ? (<>
                            <img className="circle" src={placeholderPhoto}/>
                            <span className="white-text name">{profile.name} {profile.surname}</span>
                            {/*<span className="white-text email">{profile.email}</span>*/}
                            <span className="white-text email">{profile.phone}</span>
                            {/*<span className="white-text email">{profile.birthday}</span>*/}
                        </>) : (
                            <span className="white-text">Вы не авторизованы</span>
                        )}
                    </div>
                </li>
                {/*<li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>*/}
                {/*<li><a href="#!">Second Link</a></li>*/}
                {/*<li>*/}
                {/*    <div className="divider"></div>*/}
                {/*</li>*/}
                {/*<li><a className="subheader">Subheader</a></li>*/}
                {/*<li><a className="waves-effect" href="#!">Third Link With Waves</a></li>*/}
                {isAuth ? (
                    <li><NavLink activeClassName="isActiveMobile" to="/logout">Выйти</NavLink></li>
                ) : (
                    <li><NavLink activeClassName="isActiveMobile" to="/login">Войти</NavLink></li>
                )}
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                className="material-icons" style={{color: 'black'}}>menu</i></a>
        </>
    )
}

export default Sidenav