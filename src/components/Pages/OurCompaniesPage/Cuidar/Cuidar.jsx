import './Cuidar.css'
import React from 'react'

function Cuidar() {
    return (
        <section className="container-fluid Cuidar">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 Cuidar__clip">
                        <div className="Cuidar__stroke parallax" data-speed="-0.04" data-axis="horizontal" />
                        <div className="Cuidar__clip-content parallax" data-speed="0.06" data-axis="vertical" />
                    </div>
                    <div className="col-12 col-sm-5">
                        <h1 className="text-center">Cuidar la salud de los venezolanos</h1>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Cuidar
