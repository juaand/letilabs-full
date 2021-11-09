import './Banner.css'
import React from 'react'

function Banner() {
    return (
        <section className="container-fluid Banner">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__title">
                        <h1>Desarrollamos soluciones que marcan la diferencia en la vida de los venezolanos</h1>
                    </div>
                    <div className="col-12 col-sm-6 Banner__bg"></div>
                </div>
            </div>
            <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
            <div className="leti-red-triangle parallax" data-speed=".3" data-axis="vertical"></div>
        </section>
    )
}

export default Banner
