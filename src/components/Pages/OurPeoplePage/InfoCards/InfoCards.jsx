import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getInfoCardsOurPeople} from '../../../../services/ApiClient'


function InfoCards() {

    const [dataOurPeople, setDataOurPeople] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getInfoCardsData = await getInfoCardsOurPeople()
            setDataOurPeople(getInfoCardsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid InfoCards__OurPeople" style={{
            background: `url(${dataOurPeople[0]?.imgURL}) no-repeat top center / cover`,
        }}>
            <Fade triggerOnce>
                <h1>{dataOurPeople[0]?.mainTitle}</h1>
            </Fade>
            <div className="container-fluid InfoCards">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row justify-content-around">
                            <Fade className="col InfoCards__OurPeople__cards" cascade delay={300} direction="up" triggerOnce>
                                {dataOurPeople.map(el =>
                                    <>
                                        <h4>{el.title}</h4>
                                        <p>{el.info}</p>
                                    </>)}
                            </Fade>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoCards
