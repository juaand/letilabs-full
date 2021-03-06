import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"

import './Megat.css'
import {getMegat} from '../../../../services/ApiClient'

function Megat() {

    const [megatData, setMegatData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getMegatData = await getMegat()
            setMegatData(getMegatData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid Megat">
            <div className="row">
                <Fade triggerOnce delay={400} direction="up">
                    <div className="Megat__blue-stroke parallax-rotate" data-speed="0.1" />
                </Fade>
                <Fade direction="left" triggerOnce>
                    <div className="col-12 col-sm-6 Megat__clip" />
                </Fade>
                <div className="col-11 col-sm-5 offset-sm-6 Megat__info">
                    <Fade direction="down" triggerOnce>
                        <h1>{megatData?.title}</h1>
                    </Fade>
                    <Fade triggerOnce delay={200}>
                        <div className="Megat__logo" style={{
                            background: `url(${megatData?.logoURL}) no-repeat center center / contain`,
                        }}></div>
                    </Fade>
                    <p className="Megat__desc" dangerouslySetInnerHTML={{__html: megatData?.description}} />
                    <a href={megatData?.url} target="_blank" className="leti-btn" rel="noopener noreferrer">{megatData?.buttonTitle}</a>
                </div>
            </div>
        </section>
    )
}

export default Megat
