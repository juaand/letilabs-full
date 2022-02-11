import './Loader.css'
import React from 'react'

function Loader({message}) {
    return (
        <section className="Loader">
            <div className="Loader__container">
                <div className="Loader__container__content">{message}</div>
                <div className="Loader__stroke__red" />
                <div className="Loader__stroke__blue" />
            </div>
        </section>
    )
}

export default Loader
