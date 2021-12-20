import './Banner.css'
import React from 'react'
import {Fade} from "react-awesome-reveal"

function Banner() {
    return (
        <section className="container-fluid Banner__OurPeople">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__OurPeople__title">
                        <Fade direction="left" duration={600} triggerOnce>
                            <h1>Contamos con un talento humano especializado que tienen años trabajando en el campo, y más importante, trabajando con nosotros</h1>
                            <p>Gracias a nuestro talento es posible desarrollar nuestro amplio y diverso portafolio, que cuidan de <span className="blue-text">la salud de todo el país.</span></p>
                        </Fade>
                    </div>
                    <div className="col-12 col-sm-6 Banner__OurPeople__bg">
                        <Fade delay={300} duration={600} triggerOnce>
                            <img src="/images/our-people-bg.png" alt="Propósito y responsabilidad social banner" />
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
