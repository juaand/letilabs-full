import './Portafolio.css'
import React from 'react'
import dataPortafolio from '../../../../data/dataPortafolio'

function Portafolio() {
    return (
        <>
            <section className="container-fluid Portafolio">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7">
                            <div className="row justify-content-between">
                                {dataPortafolio.map(el =>
                                    <div className="col-12 col-sm-5 Portafolio__item">
                                        <h2>{el.title}</h2>
                                        <p>{el.desc}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="big-red-triangle">
                    <h1>Nuestro portafolio cuenta con 4 tipos de medicamentos</h1>
                </div>
                <div className="big-blue-triangle"></div>
            </section>
        </>
    )
}

export default Portafolio
