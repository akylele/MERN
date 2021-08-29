import React from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export default function DelTariffBlock(props) {
    const { request } = useHttp()
    const message = useMessage()

    const { id, name, price ,desc } = props

    const DeleteHandler = async () => {
        try {
            const body = { id, name }
            const data = await request('/api/tarifs/del_tarif', 'POST', body)
            message(data.message)
            props.getTarifs()
        } catch (e) { }
    }

    const NullifyHandler = async () => {
        try {
            const body = { id, name }
            const data = await request('/api/tarifs/null_tarif', 'POST', body)
            message(data.message)
            props.getTarifs()
        } catch (e) { }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{desc}</td>
            <td>{price}</td>
            <td><button onClick={NullifyHandler} className="btn orange">Обнулить</button></td>
            <td><button onClick={DeleteHandler} className="btn red">Удалить</button></td>
        </tr>
    )
}