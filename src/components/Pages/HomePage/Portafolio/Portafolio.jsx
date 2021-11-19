import './Portafolio.css'
import React from 'react'
import dataPortafolio from '../../../../data/dataPortafolio'
import {Fade} from "react-awesome-reveal"

function Portafolio() {
    return (
        <section className="container-fluid Portafolio">
            <div className="row">
                <div className="col-11 col-sm-5 offset-sm-2 order-xs-2">
                    <div className="row justify-content-between">
                        {dataPortafolio.map(el =>
                            <div className="col-12 col-sm-5 Portafolio__item">
                                <h2>{el.title}</h2>
                                <p>{el.desc}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-12 col-sm-5 Portafolio__triangles order-xs-1">
                    <div className="big-red-triangle parallax" data-speed=".1" data-axis="horizontal">
                        <Fade delay={400} triggerOnce>
                            <h1>Nuestro portafolio cuenta con 4 tipos de medicamentos</h1>
                        </Fade>
                    </div>
                    <div className="big-blue-triangle parallax" data-speed="-.1" data-axis="horizontal"></div></div>
            </div>
        </section>
    )
}

export default Portafolio
