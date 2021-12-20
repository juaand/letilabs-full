import './Banner.css'
import React from 'react'
import {Fade} from "react-awesome-reveal"

function Banner() {
    return (
        <section className="container-fluid Banner__Purpose">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__Purpose__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1>Ratificamos nuestro compromiso con Venezuela para marcar la diferencia en la vida de todos los venezolanos, acompañándolos en todo momento.</h1>
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__Purpose__bg">
                        <Fade delay={300} duration={600} triggerOnce>
                            <img src="/images/purpose-bg.png" alt="Propósito y responsabilidad social banner" />
                        </Fade>
                    </div>
                </div>
            </div>
            <Fade cascade delay={600} triggerOnce>
                <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax" data-speed=".03" data-axis="vertical"></div>
            </Fade>
        </section>
    )
}

export default Banner
