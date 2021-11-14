import './BottomCta.css'
import React from 'react'

function BottomCta() {
    return (

        <section className="container-fluid BottomCta">
            <div className="row">
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__talento" alt="Conoce al talento que hace todo posible" />
                    <div className="BottomCta__title">
                        <h2>Conoce al talento que hace todo posible</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0 BottomCta__img">
                    <div className="BottomCta__megat" alt="Conoce la empresa homóloga de Leti en Ecuador" />
                    <div className="BottomCta__title">
                        <h2>Conoce la empresa homóloga de Leti en Ecuador
                        </h2>
                        <a href="https://megat.com.ec/" target="_blank" className="leti-btn" rel="noopener noreferrer">Visita Megat</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BottomCta
