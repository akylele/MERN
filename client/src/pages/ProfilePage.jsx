import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import placeholderPhoto from "../images/sunset-scenery-minimal-4k-green.jpg";
import {fetchEditProfileStart} from "../redux/actions/auth";

const types = {
    READ: 'read',
    EDIT: 'edit'
}

const ProfilePage = () => {
    const profile = useSelector(state => state.authReducer.profile)
    const dispatch = useDispatch()
    const [type, setType] = useState(types.READ)
    const [disabledInputs, setDisabledInputs] = useState(true)
    const [form, setForm] = useState({
        name: profile.name || '',
        surname: profile.surname || '',
        age: profile.age || '',
        phone: profile.phone || '',
        email: profile.email || '',
        birthday: profile.birthday || ''
    })

    useEffect(() => {
        if (type === types.READ) {
            setDisabledInputs(true)
        } else {
            setDisabledInputs(false)
        }
    }, [type])

    const handlerEdit = () => {
        setType(type === types.READ ? types.EDIT : types.READ)
    }

    const handleChangeInput = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleConfirm = () => {
        dispatch(fetchEditProfileStart(form))
    }
    console.log(form)
    return (
        <div className="profile">
            <div className="row" style={{
                margin: '40px 0'
            }}>
                <div className="col l4 xl4 m6 s12">
                    <div className="profile__image"/>
                </div>
                <div className="col l8 xl6 m12 s12">
                    <div className="row">
                        <div className="input-field col l4 xl4 m4 s12">
                            <input id="name"
                                   type="text"
                                   className="validate black-input"
                                   name="name"
                                   defaultValue={profile.name}
                                   disabled={disabledInputs}
                                   onChange={(e) => handleChangeInput('name', e.target.value)}/>
                            <label htmlFor="name">name</label>
                        </div>
                        <div className="input-field col l4 xl4 m4 s12">
                            <input
                                id="surname"
                                type="text"
                                className="validate black-input"
                                name="surname"
                                defaultValue={profile.surname}
                                disabled={disabledInputs}
                                onChange={(e) => handleChangeInput('surname', e.target.value)}/>
                            <label htmlFor="surname">surname</label>
                        </div>
                        <div className="input-field col l4 xl4 m4 s12">
                            <input
                                id="age"
                                type="number"
                                className="validate black-input"
                                name="age"
                                defaultValue={profile.age}
                                disabled={disabledInputs}
                                onChange={(e) => handleChangeInput('age', e.target.value)}/>
                            <label htmlFor="age">age</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col l4 xl4 m4 s12">
                            <input
                                id="email"
                                type="text"
                                className="validate black-input"
                                name="email"
                                defaultValue={profile.email}
                                disabled={disabledInputs}
                                onChange={(e) => handleChangeInput('email', e.target.value)}/>
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="input-field col l4 xl4 m4 s12">
                            <input
                                id="phone"
                                type="text"
                                className="validate black-input"
                                name="phone"
                                defaultValue={profile.phone}
                                disabled={disabledInputs}
                                onChange={(e) => handleChangeInput('phone', e.target.value)}/>
                            <label htmlFor="phone">phone</label>
                        </div>
                        <div className="input-field col l4 xl4 m4 s12">
                            <input
                                id="birthday"
                                type="date"
                                className="validate black-input"
                                name="birthday"
                                defaultValue={profile.birthday}
                                disabled={disabledInputs}
                                onChange={(e) => handleChangeInput('birthday', e.target.value)}/>
                            <label htmlFor="birthday">birthday</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l4 xl4 m4 s12">
                            <span
                                className="btn yellow darken-4"
                                onClick={handlerEdit}
                            >
                                Редактировать
                            </span>
                        </div>
                        <div className="col l4 xl4 m4 s12">
                            <span
                                className="btn red darken-4"
                            >
                                Удалить профиль
                            </span>
                        </div>
                        <div className="col l4 xl4 m4 s12">
                            <span
                                className="btn light-green darken-4"
                                disabled={type === types.READ}
                                onClick={handleConfirm}
                            >
                                Применить
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
