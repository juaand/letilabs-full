import './Loader.css'
import React from 'react'

function Loader() {
    return (
        <section className="Loader">
            <div className="Loader__container">
                <div className="Loader__stroke__red"></div>
                <div className="Loader__stroke__blue"></div>
            </div>
        </section>
    )
}

export default Loader
