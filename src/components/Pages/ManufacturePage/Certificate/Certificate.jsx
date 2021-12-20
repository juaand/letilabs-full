import './Certificate.css'
import React from 'react'

function Certificate() {
    return (
        <section className="container-fluid Certificate">
            <div className="Certificate__img">(Certificado, sello o documento que avale el cumplimiento)</div>
            <main className="container Certificate__visible">
                <div className="row">
                    <div className="col-12 offset-sm-6 col-sm-6 Certificate__info">
                        <h1>Cumplimos con todas las regulaciones</h1>
                        <p>Para producir medicamentos en Venezuela, primero
                            hay que cumplir con varias exigencias para asegurar que el producto sea seguro y de calidad.</p>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Certificate
