import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
// import { useHistory } from 'react-router-dom'
// import $ from 'jquery'



export default function DelTarifBlock(props) {

    // const history = useHistory()
    const { request } = useHttp()
    const message = useMessage()
    const DeleteHandler = async () => {
        try {
            const data = await request('/api/tarifs/del_tarif', 'POST', {id:props.id,name:props.name})
            message(data.message)
            props.getTarifs()
        } catch (e) { }
    }
    const NullifyHandler = async () => {
        try {
            const data = await request('/api/tarifs/null_tarif', 'POST', {id:props.id,name:props.name})
            message(data.message)
            props.getTarifs()
        } catch (e) { }
    }
    return (
        
        <tr>
            <td>{props.name}</td>
            <td>{props.desc}</td>
            <td>{props.price}</td>
            <td><button onClick={NullifyHandler} className="btn orange">Обнулить</button></td>
            <td><button onClick={DeleteHandler} className="btn red">Удалить</button></td>
        </tr>
    )
}