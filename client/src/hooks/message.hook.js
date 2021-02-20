import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {clearMessage} from '../redux/actions/message'

const Alert = () => {
    const dispatch = useDispatch()
    const messageText = useSelector(store => store.messageReducer.message)


    useEffect(() => {
        if (window.M && messageText) {
            window.M.toast({html: messageText})
            dispatch(clearMessage())
        }
    }, [messageText])

    return null
}

export default Alert