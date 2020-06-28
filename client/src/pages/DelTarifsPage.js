import React, { useState, useCallback, useContext, useEffect } from 'react'
import DelTarifBlock from '../components/DelTarifBlock'
import { useHttp } from '../hooks/http.hook'
import AuthContext from '../context/auth.context'
import Loading from '../components/Loading'


export default function DelTarifsPage() {

    const auth = useContext(AuthContext)
    const [tarifs, setTarifs] = useState([])
    const { request, loading } = useHttp()

    const getTarifs = useCallback(async () => {
        const fetched = await request('/api/tarifs/', 'GET', null, {
            Authorization: auth.token
        })
        setTarifs(fetched)
    }, [request, auth.token])

    useEffect(() => {
        getTarifs()
    }, [])

    if (loading) {
        return <Loading />
    }

    if(!tarifs.length){
        return (
            <h4>Тарифов пока нет</h4>
        )
    }

    return (
        <table className="centered highlight" >
            <tbody>
                {!loading && tarifs.map(tarif => {
                    return <DelTarifBlock
                        key={tarif._id}
                        id={tarif._id}
                        name={tarif.Name}
                        desc={tarif.Description}
                        price={tarif.Price}
                        getTarifs={getTarifs}
                    />

                })}
            </tbody>
        </table>


    )



}
