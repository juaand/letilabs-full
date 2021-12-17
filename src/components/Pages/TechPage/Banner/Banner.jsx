import './Banner.css'
import React from 'react'
import {Fade} from 'react-awesome-reveal'

function Banner() {

    return (
        <section className="container-fluid Banner__Tech">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 Banner__Tech__title">
                        <Fade delay={300} direction="left" triggerOnce>
                            <h1>Tecnología</h1>
                            <h3>Nuestra planta está ubicada en Guarenas, estado Miranda, y es la planta producción de fármacos más grande a nivel nacional.<br /><br />Cuenta con la única planta de cefalosporínicos existentes en Venezuela y una de las pocas penicilínicos, siendo modelo de Latinoamérica.</h3>
                        </Fade>
                    </div>
                    <Fade cascade delay={300} triggerOnce>
                        <div className="Banner__Tech__blue parallax" data-speed="-0.08" data-axis="vertical"></div>
                        <div className="Banner__Tech__bg parallax" data-speed="-.1" data-axis="vertical"></div>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Banner
