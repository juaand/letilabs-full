import './Productos.css'
import React from 'react'
import {Link} from 'react-router-dom'

function Productos() {
    return (
        <section className="container Productos">
            <div className="Productos__genven-001 parallax" data-axis="horizontal" data-speed="0.2" />
            <div className="Productos__genven-002 parallax" data-axis="horizontal" data-speed="0.17"/>
            <div className="Productos__genven-003 parallax" data-axis="horizontal" data-speed="0.1"/>
            <div className="row">
                <div className="col-9 col-sm-5 offset-sm-1 Productos__info">
                    <h1 className="Productos__desc">Ofrecemos terapias en las principales áreas terapéuticas: Cardiovascular, anti-infecciosos, anti-inflamatorios y analgésicos.</h1>
                    <Link to="/productos" className="leti-btn">Conoce los productos</Link>
                </div>
            </div>
        </section>
    )
}

export default Productos
