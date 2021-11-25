import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__Biocontrolled">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Biocontrolled__title">
                        <Fade triggerOnce>
                            <img className="Banner__Biocontrolled-logo" src="./images/biocontrolled.svg" alt="Biocontrolled logo" />
                        </Fade>
                        <Fade delay={300} direction="left" triggerOnce>
                            <h3>Esta es la unidad de explorar nuevas maneras y eficaces maneras de desarrollar medicamentos, gracias a <span className="blue-text">Biocontrolled</span> es que nos mantenemos a la vanguardia y podemos seguir ofreciendo productos cada vez más beneficiosos.</h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__Biocontrolled__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Biocontrolled__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
