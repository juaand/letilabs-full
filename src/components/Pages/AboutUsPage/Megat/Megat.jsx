import './Megat.css'
import React from 'react'
import {Link} from 'react-router-dom'

function Megat() {
    return (
        <section className="container Megat">
            <div className="row">
                <div className="col-11 col-sm-6 Megat__clip"/>
                <div className="Megat__blue-stroke parallax-rotate" data-speed="0.1" />
                <div className="col-11 col-sm-5 offset-sm-6 Megat__info">
                    <h1>Laboratorios Leti en latinoamérica</h1>
                    <div className="Megat__logo"></div>
                    <p className="Megat__desc">Empresa homóloga de Laboratorios Leti que desarrolla productos de nuestro portafolio para los ecuatorianos</p>
                    <Link to="/" className="leti-btn">Conocer Megat</Link>
                </div>
            </div>
        </section>
    )
}

export default Megat
