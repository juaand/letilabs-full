import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getOurCompaniesInfoCardsLeti} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function InfoCards() {

    const [dataLeti, setDataLeti] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getOurCompaniesOCData = await getOurCompaniesInfoCardsLeti()
            setDataLeti(getOurCompaniesOCData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container InfoCards__Leti">
                <div className="row justify-content-around">
                    <Fade className="col-11 col-sm-4 InfoCards__Leti__cards" cascade delay={300} direction="up" triggerOnce>
                        {dataLeti.map(el =>
                            <>
                                <h4>{el.title}</h4>
                                <p>{el.info}</p>
                            </>
                        )}
                    </Fade>
                </div>
            </section>
        </>
    )
}

export default InfoCards
