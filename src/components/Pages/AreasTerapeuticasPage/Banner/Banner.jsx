import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__AreasTerapeuticas">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__AreasTerapeuticas__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Áreas terapéuticas</h1>
                            <h3>Atendemos una variedad de áreas terapéuticas para cubrir con las necesidades de salud de los venezolanos y asegurar el bienestar del país</h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__AreasTerapeuticas__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__AreasTerapeuticas__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
