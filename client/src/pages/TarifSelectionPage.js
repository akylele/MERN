import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Loading from '../components/Loading'



export default function TarifSelectionPage() {
    const { request, loading } = useHttp()
    const message = useMessage()
    const [tarifs, setTarifs] = useState('')
    // const [regions, setRegions] = useState([])

    function checkHandler(a) {
        const parent = $(a).parents('.row').eq(0)
        const input1 = $(parent).children('.input-field').eq(1).children('input')
        const input2 = $(parent).children('.input-field').eq(2).children('input')

        if ($(a).is(':checked') === true) {
            $(input1).prop('disabled', false)
            $(input2).prop('disabled', false)
        } else {
            $(input1).prop('disabled', true)
            $(input2).prop('disabled', true)
        }
    }
    $('input[type="number"]').keydown((e) => {
        if ((e.which >= 48 && e.which <= 57)  // цифры
            || (e.which >= 96 && e.which <= 105)  // num lock
            || e.which === 8 // backspace
            || (e.which >= 37 && e.which <= 40) // стрелки
            || e.which === 46) // delete 
        {
            return true;
        } else {
            return false;
        }
    })

    $('button.liked').on('click', async (e) => {
        e.preventDefault()
        if ($('#hidvalue').val() == "0") {
            $('#hidvalue').val(1)
            let elem = e.target
            let parentId = $(elem).parents('div.col').prop('id')
            let res = await request('/api/tarifs/liked', 'POST', { id: parentId })
            message(res.message)
            console.log(tarifs)
            $('.div_pick .row').append(tarifs)
            $('button.liked').prop('disabled', true)
        } else {
            return
        }
    })

    async function pick(e) {
        e.preventDefault()
        if ($('#price1').val() || $('#price2').val()) {
            $('.div_pick .row').html('')
            let dataForm = $('form').serializeArray()
            let response = await request('/api/tarifs/pick_up', 'POST', dataForm)
            message(response.message)
            if (response.tarifs) {
                let title = `<h5>Если тарифов несколько, тогда тарифы будут показаны по порядку по вашим предпочтениям</h5>`
                $('.div_pick .row').append(title)
                response.tarifs.map((tarif) => {
                    let Description, MBInternet, MBMinutes, MBSms, HISpeed, TChannels = null
                    if (tarif.Description) {
                        Description = `<h5>${tarif.Description}</h5>`
                    } else { Description = `` }
                    if (tarif.MBInternet) {
                        MBInternet = `<div>Количество трафика: ${tarif.MBInternet}</div>`
                    } else { MBInternet = `` }
                    if (tarif.MBMinutes) {
                        MBMinutes = `<div>Количество минут: ${tarif.MBMinutes}</div>`
                    } else { MBMinutes = `` }
                    if (tarif.MBSms) {
                        MBSms = `<div>Количество SMS: ${tarif.MBSms}</div>`
                    } else { MBSms = `` }
                    if (tarif.HISpeed) {
                        HISpeed = `<div><h5>Домашний интернет</h5><div>Скорость: ${tarif.HISpeed}</div></div>`
                    } else { HISpeed = `` }
                    if (tarif.TChannels) {
                        TChannels = `<div><h5>Телевидение</h5><div>Количество каналов: ${tarif.TChannels}</div></div>`
                    } else { TChannels = `` }
                    let str = `
                                <div class="col s12 m6 l6 xl3" key=${tarif._id} id=${tarif._id}>
                                <div class="card gray hoverable ">
                                    <div class="card-content black-text" >
                                        <span class="card-title">${tarif.Name}</span><hr></hr>
                                        ${Description}
                                        <div>Цена: ${tarif.Price}</div>
                                        ${MBInternet}
                                        ${MBMinutes}
                                        ${MBSms}
                                        ${HISpeed}
                                        ${TChannels}
                                    </div>
                                    <div class="card-action">
                                    <button class="btn liked blue">Нажмите, если подходит</button>
                                    </div>
                            </div>`
                    $('.div_pick .row').append(str)

                })
            }
            setTarifs($('.div_pick .row').html())
            console.log(tarifs)
        } else {
            message('Заполните данные')
        }
    }

    // async function takeRegions() {
    //     fetch('http://www.json-generator.com/api/json/get/bOISSukaKW?indent=2')
    //         .then(response => response.json()) // преобразуем ответ в json
    //         .then(data => {
    //             setRegions(data)
    //         })
    //         .catch(error => console.error(error))
    // }
    // useEffect(() => {
    //     takeRegions()
    // }, [])


    if (loading) {
        return <Loading />
    }

    return (
        <form name="form_pick" id="form_pick">
            <h3>Подобрать тариф</h3>
            <div className="row">
                <div className="row">
                    <div className="input-field col s6" >
                        <input id="price1" name="price1" type="number" className="validate" />
                        <label htmlFor="price1">Цена от:</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="price2" name="price2" type="number" className="validate" min="1" />
                        <label htmlFor="price2">Цена до:</label>
                    </div>
                </div>
                {/* < div className="row">
                    <label>Регион</label>
                    <select className="browser-default">
                        <option value="" disabled selected>Необходимо выбрать</option>
                        {regions.map((reg, index) => {
                            console.log(reg)
                            return (
                                <option value={index + 1} key={reg.id}>{reg.title}</option>
                            )
                        })}
                    </select>
                </div> */}
                <h5>Мобильная связь</h5>
                <div className="row">
                    <div className="input-field col s1">
                        <label>
                            <input type="checkbox" name="check_internet" id="check_internet" onChange={(event) => { checkHandler(event.target) }} />
                            <span></span>
                        </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="internet1" name="internet1" type="number" className="validate" disabled min="0" />
                        <label htmlFor="internet1">Интернет(ГБ) от:</label>
                    </div>
                    <div className="input-field col s5">
                        <input id="internet2" name="internet2" type="number" className="validate" disabled min="1" />
                        <label htmlFor="internet2">Интернет(ГБ) до:</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s1">
                        <label>
                            <input type="checkbox" name="check_minutes" id="check_minutes" onChange={(event) => { checkHandler(event.target) }} />
                            <span></span>
                        </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="minutes1" name="minutes1" type="number" className="validate" disabled min="0" />
                        <label htmlFor="minutes1">Минут от:</label>
                    </div>
                    <div className="input-field col s5">
                        <input id="minutes2" name="minutes2" type="number" className="validate" disabled min="1" />
                        <label htmlFor="minutes2">Минут до:</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s1">
                        <label>
                            <input type="checkbox" name="check_sms" id="check_sms" onChange={(event) => { checkHandler(event.target) }} />
                            <span></span>
                        </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="Sms1" name="Sms1" type="number" className="validate" disabled min="0" />
                        <label htmlFor="Sms1">Sms от:</label>
                    </div>
                    <div className="input-field col s5">
                        <input id="Sms2" name="Sms2" type="number" className="validate" disabled min="1" />
                        <label htmlFor="Sms2">Sms до:</label>
                    </div>
                </div>


                <h5>Домашний интернет</h5>
                <div className="row">
                    <div className="input-field col s1">
                        <label>
                            <input type="checkbox" name="check_home_internet" id="check_home_internet" onChange={(event) => { checkHandler(event.target) }} />
                            <span></span>
                        </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="HInternet1" name="HInternet1" type="number" className="validate" disabled min="0" />
                        <label htmlFor="HInternet1">Интернет(ГБ) от:</label>
                    </div>
                    <div className="input-field col s5">
                        <input id="HInternet2" name="HInternet2" type="number" className="validate" disabled min="1" />
                        <label htmlFor="Hinternet2">Интернет(ГБ) до:</label>
                    </div>
                </div>


                <h5>Телевидение</h5>
                <div className="row">
                    <div className="input-field col s1">
                        <label>
                            <input type="checkbox" name="check_television" id="check_television" onChange={(event) => { checkHandler(event.target) }} />
                            <span></span>
                        </label>
                    </div>
                    <div className="input-field col s5">
                        <input id="Television1" name="Television1" type="number" className="validate" disabled min="0" />
                        <label htmlFor="Television1">Количество каналов до:</label>
                    </div>
                    <div className="input-field col s5">
                        <input id="Television2" name="Television2" type="number" className="validate" disabled min="1" />
                        <label htmlFor="Television2">Количество каналов от:</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light blue marginright" onClick={pick}>Подобрать</button>
                <button
                    className="btn waves-effect waves-light orange"
                    onClick={(e) => {
                        e.preventDefault();
                        $('input[type="number"]').val('');
                        $('input[type="checkbox"]').prop("checked", false)
                    }}>
                    Сбросить
                        </button>
            </div>
            <div className="div_pick">
                <input type="hidden" id="hidvalue" value="0" />
                <div className="row"></div>
            </div>
        </form>
    )
}
