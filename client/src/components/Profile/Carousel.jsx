import React from 'react'

import InfoBlock from './InfoBlock'

const Carousel = ({profile}) => {
const date = new Date(profile.createdAt)
    return (
        <div className="info-block-container">
            <InfoBlock text={[`Регистрация: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,`Минут на сайте: ${(-Number(date - Date.now())/1000/60).toFixed(0)}`]}
        />
            <InfoBlock/>
            <InfoBlock/>
            <InfoBlock/>
            <InfoBlock/>
        </div>
    )
}

export default Carousel