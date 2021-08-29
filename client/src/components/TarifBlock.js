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
                        const {
                            _id,
                            Name,
                            Description,
                            MBInternet,
                            MBMinutes,
                            Price,
                            MBSms,
                            HISpeed,
                            TChannels
                        } = tarif

                        return (
                            <div className="col s12 m6 l4 xl4" key={_id}>
                                <div className="card gray hoverable ">
                                    <div className="card-content black-text" style={{ height: 'min-content', minHeight: '400px' }}>
                                        <span className="card-title">{Name}</span><hr></hr>
                                        {Description && <div><h5>{Description}</h5><hr></hr> </div>}
                                        <div>Цена: {Price}</div>
                                        {MBInternet && <div>Количество трафика: {MBInternet}</div>}
                                        {MBMinutes && <div>Количество минут: {MBMinutes}</div>}
                                        {MBSms && <div>Количество SMS: {MBSms}</div>}
                                        {HISpeed && <div><h5>Домашний интернет</h5><div>Скорость: {HISpeed}</div></div>}
                                        {TChannels && <div><h5>Телевидение</h5><div>Количество каналов: {TChannels}</div></div>}
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