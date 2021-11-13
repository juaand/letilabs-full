import './Banner.css'
import React from 'react'

function Banner() {
    return (
        <section className="container-fluid Banner__ourCompanies">
            <div className="container">
                <div className="row d-flex">
                    <div className="col-12 col-sm-6 Banner__ourCompanies__title">
                        <h1>Nos conformamos por tres grandes unidades de negocio, que se dedican a diferentes áreas, pero trabajan entre ellas para lograr <span className="blue-text">mejores resultados</span></h1>
                    </div>
                    <div className="col-12 col-sm-6 Banner__ourCompanies__bg"></div>
                </div>
            </div>
            <div className="leti-blue-triangle parallax" data-speed="-.2" data-axis="vertical"></div>
            <div className="leti-red-triangle parallax" data-speed=".3" data-axis="vertical"></div>
        </section>
    )
}

export default Banner
