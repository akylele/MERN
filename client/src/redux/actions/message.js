import {
    SEND_MESSAGE,
    CLEAR_MESSAGE
} from '../constans'

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    message
})