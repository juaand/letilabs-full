import './InfoCards.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getOurCompaniesInfoCardsBiocontrolled} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function InfoCards() {

    const [dataBiocontrolled, setDataBiocontrolled] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getOurCompaniesOCData = await getOurCompaniesInfoCardsBiocontrolled()
            setDataBiocontrolled(getOurCompaniesOCData)
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
                    <Fade className="col InfoCards__Leti__cards" cascade delay={300} direction="up" triggerOnce>
                        {dataBiocontrolled.map(el =>
                            <>
                                <h4>{el.title}</h4>
                                <p dangerouslySetInnerHTML={{__html: el.info}} />
                            </>)}
                    </Fade>
                </div>
            </section>
        </>
    )
}

export default InfoCards
