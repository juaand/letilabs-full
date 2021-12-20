import './Director.css'
import React from 'react'
import {Link} from 'react-router-dom'

function Director() {
    return (
        <section className="container-fluid Director">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 Director__image"></div>
                    <div className="col-12 col-sm-6 offset-sm-6 Director__info">
                        <h1>Liderados por profesionales de trayectoria</h1>
                        <p>(Cita director de Laboratorios Leti)</p>
                        <Link to="/" className="leti-btn">Concoce nuestra filosofía</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Director
