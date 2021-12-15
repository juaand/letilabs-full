import './UsInfo.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {Fade, Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"

function UsInfo() {

    const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -10rem, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`

    return (
        <section className="container Nosotros">
            <div className="row">
                <div className="col-11 col-sm-6">
                    <Reveal keyframes={customAnimation}>
                        <p className="Nosotros__valor">
                            <span className="blue-text">Grupo Leti</span> es un laboratorio farmacéutico venezolano que por más de 70 años ha generado soluciones de salud con la producción y comercialización de un amplio portafolio de medicamentos, sustentado por nuestro destacado y comprometido talento humano. Somos pioneros en el desarrollo del sector, con tecnología de vanguardia y cumpliendo los más altos estándares de calidad globales para mejorar la vida de todos constante y oportunamente.
                        </p>
                    </Reveal>
                    <Fade triggerOnce>
                        <Link to={{
                            pathname: '/sobre-nosotros'
                        }} className="leti-btn">Conoce más sobre nosotros
                        </Link>
                    </Fade>
                </div>
                <Fade cascade duration={600} delay={300} triggerOnce>
                    <div className="leti-blue-triangle parallax-rotate" data-speed="-.1" data-axis="vertical"></div>
                    <div className="leti-red-triangle parallax-rotate" data-speed=".05" data-axis="vertical"></div>
                </Fade>
            </div>
        </section>
    )
}

export default UsInfo
