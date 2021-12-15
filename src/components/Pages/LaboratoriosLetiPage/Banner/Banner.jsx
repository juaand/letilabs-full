import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__Leti">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Leti__title">
                        <Fade triggerOnce>
                            <img className="Banner__Leti-logo" src="./images/leti.svg" alt="Leti" />
                        </Fade>
                        <Fade delay={300} direction="left" triggerOnce>
                            <h3>Esta es la unidad que se encarga de desarrollar la gama de productos que abarca diferentes áreas terapéuticas: cardiovascular, metabolismo, gástrica, respiratoria, neurológicas, músculo-esqueléticas, dolor, antibióticos, vitaminas, tanto para el paciente pediátrico como para el paciente adulto.</h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__Leti__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Leti__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
