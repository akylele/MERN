import React, { useState, useCallback, useContext, useEffect } from 'react'
import DelTariffBlock from '../components/DelTariffBlock'
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
                {!loading && tarifs.map(tariff => {
                    const {
                        _id,
                        Name,
                        Description,
                        Price
                    } = tariff
                    return <DelTariffBlock
                        key={_id}
                        id={_id}
                        name={Name}
                        desc={Description}
                        price={Price}
                        getTarifs={getTarifs}
                    />
                })}
            </tbody>
        </table>
    )
}
