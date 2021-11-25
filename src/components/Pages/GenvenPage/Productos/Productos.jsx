import './Productos.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {Fade, Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"

function Productos() {

    const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 10rem, 0);
    }
  
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }`


    return (
        <section className="container Productos">
            <div className="Productos__genven-001 parallax" data-axis="horizontal" data-speed="0.2" />
            <div className="Productos__genven-002 parallax" data-axis="horizontal" data-speed="0.17" />
            <div className="Productos__genven-003 parallax" data-axis="horizontal" data-speed="0.1" />
            <div className="row">
                <div className="col-9 col-sm-5 offset-sm-1 Productos__info">
                    <Fade direction="up" triggerOnce>
                        <h1 className="Productos__desc">Ofrecemos terapias en las principales áreas terapéuticas: Cardiovascular, anti-infecciosos, anti-inflamatorios y analgésicos.</h1>
                    </Fade>
                    <Reveal delay={200} keyframes={customAnimation} triggerOnce>
                        <Link to="/productos" className="leti-btn">Conoce los productos</Link>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default Productos
