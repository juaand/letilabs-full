import './Banner.css'
import React from 'react'

function Banner() {
    return (
        <section className="container-fluid Banner">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h1>Desarrollamos soluciones que marcan la diferencia en la vida de los venezolanos</h1></div>
                    <div className="col-12 col-sm-6 Banner__bg"></div>
                </div>
            </div>
        </section>
    )
}

export default Banner
