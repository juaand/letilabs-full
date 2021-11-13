import './BannerProductos.css'
import React from 'react'

function BannerProductos() {
    return (
        <section className="container-fluid BannerProductos">
        <img src="./images/azitomicina.png" className="BannerProductos__img-azitomicina" alt="grupo leti azitomicina"/>
        <img src="./images/diklason.png" className="BannerProductos__img-diklason" alt="grupo leti diklason"/>
        <img src="./images/ulgarin.png" className="BannerProductos__img-ulgarin" alt="grupo leti ulgarin"/>
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
