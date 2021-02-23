import React from 'react'


const InfoBlock = ({text}) => {
    return (
        <div className="info-block">
            {text && text.map(subtext => (
                <p>{subtext}</p>
            ))}
        </div>
    )
}

export default InfoBlock