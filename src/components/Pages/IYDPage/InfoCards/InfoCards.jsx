import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {getInfoCardsIdData} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function InfoCards() {

    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfoCardsIdData()
            setGetData(data)
        }
        fetchData()
        setLoading(!loading)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container InfoCards">
                <div className="row justify-content-around">
                    <Fade className="col InfoCards__cards" cascade delay={300} direction="up" triggerOnce>
                        {getData.map(el =>
                            <>
                                <div className="InfoCards__image" style={{
                                    background: `url("${el?.picPath}") no-repeat center center / cover`
                                }} />
                                <h4>{el?.title}</h4>
                                <p>{el?.info}</p>
                                <Link to={el?.btn} className="leti-btn InfoGoals__btn" />
                            </>
                        )}
                    </Fade>
                </div>
            </section>
        </>
    )
}

export default InfoCards
