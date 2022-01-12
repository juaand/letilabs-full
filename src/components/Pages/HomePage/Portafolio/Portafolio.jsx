import './Portafolio.css'
import React, {useState, useEffect} from 'react'
import {Fade} from "react-awesome-reveal"
import {getPortfolio} from '../../../../services/ApiClient'

function Portafolio() {

    const [getData, setGetData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPortfolio()
            setGetData(data)
            console.log(data)
        }
        fetchData()
    }, [])


    return (
        <section className="container-fluid Portafolio">
            <div className="row">
                <div className="col-11 col-sm-5 offset-sm-2 order-xs-2">
                    <div className="row justify-content-between">
                        {getData.map(el =>
                            <div className="col-12 col-sm-5 Portafolio__item">
                                <h2>{el?.title}</h2>
                                <p>{el?.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-12 col-sm-5 Portafolio__triangles order-xs-1">
                    <div className="big-red-triangle parallax" data-speed=".1" data-axis="horizontal">
                        <Fade delay={400} triggerOnce>
                            <h1>{getData[0]?.superiorTitle}</h1>
                        </Fade>
                    </div>
                    <div className="big-blue-triangle parallax" data-speed="-.1" data-axis="horizontal"></div></div>
            </div>
        </section>
    )
}

export default Portafolio
