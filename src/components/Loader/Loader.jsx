import './Loader.css'
import React from 'react'

function Loader() {
    return (
        <section className="Loader">
            <div className="Loader__container">
                <div className="Loader__stroke__red"></div>
                <div className="Loader__stroke__blue"></div>
                <h1 className="Loader__text">Cargando</h1>
            </div>
        </section>
    )
}

export default Loader
