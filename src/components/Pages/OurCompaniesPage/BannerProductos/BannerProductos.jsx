import './BannerProductos.css'
import React from 'react'

function BannerProductos() {
    return (
        <section className="container-fluid BannerProductos">
        <img data-speed=".2" data-axis="horizontal" src="./images/ulgarin.png" className="parallax BannerProductos__img-ulgarin" alt="grupo leti ulgarin"/>
        <img data-speed="-.08" data-axis="horizontal" src="./images/azitomicina.png" className="parallax BannerProductos__img-azitomicina" alt="grupo leti azitomicina"/>
        <img data-speed=".1" data-axis="horizontal" src="./images/diklason.png" className="parallax BannerProductos__img-diklason" alt="grupo leti diklason"/>
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-12 col-sm-8">
                        <h1 className="BannerProductos__title">A través de esta relación de sinergia, es que logramos nuestros objetivos</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6">
                        <h1 className="BannerProductos__subtitle">Ofrecer gran variedad y efectivos productos</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerProductos
