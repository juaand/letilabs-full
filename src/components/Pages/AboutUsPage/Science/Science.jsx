import './Science.css'

import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'

import {getScience} from '../../../../services/ApiClient'

function Science() {

    const [scienceData, setScienceData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getScienceData = await getScience()
            setScienceData(getScienceData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Fade direction="up" triggerOnce>
            <section className="container-fluid Science__leti">
                    <div className="Science__leti__product row">
                        <div className="Science__leti__image col-12 col-sm-6" style={{
                            background: `url(${scienceData?.imgURL}) no-repeat left center / cover`
                        }}></div>
                        <div className="col-12 col-sm-6 Science__leti__info">
                        <h1 class="Science__title">{scienceData?.title}</h1>
                            <div className="row">
                                <p className="col-12 col-sm-6 Science__leti__desc" dangerouslySetInnerHTML={{__html: scienceData?.desc}}>
                                </p>
                            </div>
                        </div>
                    </div>
            </section>
        </Fade>
    )
}

export default Science