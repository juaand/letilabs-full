import './Equipo.css'
import React from 'react'
import {Link} from 'react-router-dom'

function Equipo() {
    return (
        <section className="container-fluid Equipo">
            <div className="row">
                <div className="col-12 col-sm-6 Equipo__clip-biocontrolled" />
                <div className="Equipo__red-stroke parallax-rotate" data-speed="0.1" />
                <div className="col-11 col-sm-5 offset-sm-6 Equipo__info">
                    <p className="Equipo__desc">El laboratorio más grande y más importante por la cantidad de ventas que tenía, cantidad de productos, cantidad de categoríasdonde participaba.</p>

                    <p className="blue-text">Ramón, director de unidad</p>

                    <Link to="/equipo" className="leti-btn">Conoce al equipo directivo</Link>
                </div>
            </div>
        </section>
    )
}

export default Equipo
