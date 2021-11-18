import './Banner.css'
import React from 'react'
import {Fade} from "react-awesome-reveal"

function Banner() {
    return (
        <section className="container-fluid Banner">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1>Desarrollamos soluciones que marcan la diferencia en la vida de los venezolanos</h1>
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__bg">
                        <Fade delay={300} duration={600} triggerOnce>
                            <img src="/images/about-us-bg.png" alt="Sobre nosotros banner" />
                        </Fade>
                    </div>
                </div>
            </div>
            <Fade cascade delay={600} triggerOnce>
                <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
                <div className="leti-red-triangle parallax" data-speed=".05" data-axis="vertical"></div>
            </Fade>
        </section>
    )
}

export default Banner
