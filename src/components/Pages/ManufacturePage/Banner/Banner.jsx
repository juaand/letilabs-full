import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__Manufacture">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Manufacture__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Manufactura</h1>
                            <h3>Diariamente se manufacturan XX cantidades de todo tipo de medicinas, que salen de la planta para ser distribuidos en todo el país.<br /><br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur eleifend accumsan mi, nec ultricies sapien imperdiet sed.Donec auctor, arcu nec lobortis rhoncus, lorem mi mattis massa.
                            </h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__Manufacture__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Manufacture__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
