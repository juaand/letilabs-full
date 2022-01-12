import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__ProductsList">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 Banner__ProductsList__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Listado de productos</h1>
                            <h3>
                                Nuestro amplio portafolio de productos incluye muchas marcas reconocidas que forman parte de la historia del Grupo Leti.
                            </h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__ProductsList__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__ProductsList__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
