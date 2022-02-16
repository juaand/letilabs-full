import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getInfoCardsOurPeople, getBannerTeams} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function InfoCards() {

    const [dataOurPeople, setDataOurPeople] = useState([])
    const [dataBanner, setDataBanner] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getInfoCardsData = await getInfoCardsOurPeople()
            const getBannerData = await getBannerTeams()
            setDataOurPeople(getInfoCardsData)
            setDataBanner(getBannerData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid InfoCards__OurPeople" style={{
                background: `url(${dataBanner?.imgURL}) no-repeat top center / cover`,
            }}>
                <Fade triggerOnce>
                    <h1>{dataBanner?.mainTitle}</h1>
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
        </>
    )
}

export default InfoCards
