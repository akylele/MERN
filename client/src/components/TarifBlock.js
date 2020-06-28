import React from 'react'

export default function TarifBlock({ tarifs }) {

    if (!tarifs.length) {
        return <h4>Тарифов пока нет</h4>
    } else {


        return (
            <div>
                <h2>Все тарифы</h2>
                <div className="row">
                    {tarifs.map((tarif) => {
                        return (
                            <div className="col s12 m6 l4 xl4" key={tarif._id}>
                                <div className="card gray hoverable ">
                                    <div className="card-content black-text" style={{ height: 'min-content', minHeight: '400px' }}>
                                        <span className="card-title">{tarif.Name}</span><hr></hr>
                                        {tarif.Description ? <div><h5>{tarif.Description}</h5><hr></hr> </div> : null}
                                        <div>Цена: {tarif.Price}</div>
                                        {tarif.MBInternet ? <div>Количество трафика: {tarif.MBInternet}</div> : null}
                                        {tarif.MBMinutes ? <div>Количество минут: {tarif.MBMinutes}</div> : null}
                                        {tarif.MBSms ? <div>Количество SMS: {tarif.MBSms}</div> : null}
                                        {tarif.HISpeed ? <div><h5>Домашний интернет</h5><div>Скорость: {tarif.HISpeed}</div></div> : null}
                                        {tarif.TChannels ? <div><h5>Телевидение</h5><div>Количество каналов: {tarif.TChannels}</div></div> : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }
}