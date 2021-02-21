import React from 'react'
import placeholderPhoto from "../images/sunset-scenery-minimal-4k-green.jpg";
import {NavLink} from "react-router-dom";

const DropdownProfile = () => {

    return (
        <>
            <ul className="hide-on-med-and-down right">
                <li>
                    <a className='dropdown-trigger' href='#' data-target='dropdown1'
                       style={{height: '64px', paddingTop: '12px'}}><img src={placeholderPhoto} style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '45px'
                    }}/></a>
                </li>
            </ul>
            <ul id='dropdown1' className='dropdown-content'>
                <li/>
                <li><a href="#!">профиль</a></li>
                <li><NavLink activeClassName="isActiveMobile" to="/logout">Выйти</NavLink></li>
            </ul>
        </>
    )
}

export default DropdownProfile