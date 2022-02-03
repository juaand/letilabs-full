import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__Alliances">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Alliances__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Alianzas</h1>
                            <h3>Para lograr nuestro propósito de cuidar de la salud de los venezolanos, es importante contar con aliados que aporten al proceso y nos ayuden a ofrecer lo mejor.
                            </h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={1500} triggerOnce>
                        <div className="Banner__Alliances__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Alliances__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
