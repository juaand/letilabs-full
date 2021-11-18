import './Equipo.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'

function Equipo() {
    return (
        <section className="container-fluid Equipo">
            <div className="row">
                <Fade triggerOnce>
                    <div className="Equipo__red-stroke parallax-rotate" data-speed="0.1" />
                </Fade>
                <Fade triggerOnce>
                    <div className="col-12 col-sm-6 Equipo__clip" />
                </Fade>
                <div className="col-11 col-sm-5 offset-sm-6 Equipo__info">
                    <Fade triggerOnce direction="up" delay={200}>
                        <p className="Equipo__desc">El laboratorio más grande y más importante por la cantidad de ventas que tenía, cantidad de productos, cantidad de categoríasdonde participaba.</p>

                        <p className="blue-text">Ramón, director de unidad</p>
                    </Fade>
                    <Fade triggerOnce direction="up" delay={200}>
                        <Link to="/equipo" className="leti-btn">Conoce al equipo directivo</Link>
                    </Fade>
                </div>
            </div>
        </section>
    )
}

export default Equipo
