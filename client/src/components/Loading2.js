import React, { useEffect, useState } from 'react'
import $ from 'jquery'


export default function Loading2() {
    const [load, setLoad] = useState()

    function changeHandler(e) {
        if (e.target.value <= 100 && e.target.value >= 0) {
            setLoad(e.target.value * 2 + 'px')
        }
    }

    return (
        <div className="center">
            <input type="number" id="procentLoad" min="0" max="100" onChange={changeHandler}/>
            <div className="mainBlock">
                <div className="insideBlock1">LOADING</div>
                <div className="insideBlock2" style={{ width: load }}>
                </div>
            </div>
        </div>
    )
}
