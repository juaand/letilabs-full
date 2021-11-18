import './Megat.css'
import React from 'react'
import {Fade, Slide} from "react-awesome-reveal"

function Megat() {
    return (
        <section className="container-fluid Megat">
            <div className="row">
                <Fade triggerOnce delay={400}>
                    <Slide direction="up" triggerOnce>
                        <div className="Megat__blue-stroke parallax-rotate" data-speed="0.1" />
                    </Slide>
                </Fade>
                <Fade triggerOnce>
                    <Slide triggerOnce>
                        <div className="col-12 col-sm-6 Megat__clip" />
                    </Slide>
                </Fade>
                <div className="col-11 col-sm-5 offset-sm-6 Megat__info">
                    <Fade triggerOnce>
                        <Slide direction="down" triggerOnce>
                            <h1>Laboratorios Leti en latinoamérica</h1>
                        </Slide>
                    </Fade>
                    <Fade triggerOnce delay={200}>
                        <div className="Megat__logo"></div>
                    </Fade>
                    <p className="Megat__desc">Empresa homóloga de Laboratorios Leti que desarrolla productos de nuestro portafolio para los ecuatorianos</p>
                    <a href="https://megat.com.ec/" target="_blank" className="leti-btn" rel="noopener noreferrer">Conocer Megat</a>
                </div>
            </div>
        </section>
    )
}

export default Megat
