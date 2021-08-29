import React, { useState, useCallback,useContext, useEffect } from 'react'
import TarifBlock from '../components/TarifBlock'
import {useHttp} from '../hooks/http.hook'
import AuthContext from '../context/auth.context'
import Loading from '../components/Loading'


export default function TarifsPage() {
    const auth = useContext(AuthContext)
    const [tarifs,setTarifs] = useState([])
    const {request,loading} = useHttp()

    const getTarifs = useCallback(async ()=>{
        const fetched = await request('/api/tarifs/','GET',null,{
            Authorization: auth.token
        })
        setTarifs(fetched)
    },[request,auth.token])
 
    useEffect(()=>{
        getTarifs()
    },[])

    if(loading){
        return <Loading />
    }

    return (
        <>
        {!loading && <TarifBlock tarifs={tarifs}/>}
        </>
    )
}
