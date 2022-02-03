import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Link} from 'react-router-dom'
import {getInfoCardsIdData} from '../../../../services/ApiClient'

function InfoCards() {

    const [getData, setGetData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInfoCardsIdData()
            setGetData(data)
        }
        fetchData()

    }, [])


    return (
        <>
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
