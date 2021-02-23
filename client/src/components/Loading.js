import React from 'react'
import {useSelector} from "react-redux";

const Loading = () => {
    const loading = useSelector(store => store.authReducer.loading)
    if(loading){
        return (
            <div className="progress grey">
                <div className="indeterminate orange"></div>
            </div>
        )
    } else {
        return (
            <div className="progress no-display">
                <div className="indeterminate no-display"></div>
            </div>
        )
    }

}


export default Loading