import './Map.css'
import React from 'react'

function Map() {
    return (
        <section className="container-fluid Map">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 Map__image">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3027990354635!2d-66.60681018437528!3d10.476778867515785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2bab2979a6bf65%3A0x65628f1b4b1ee745!2sLaboratorios%20Leti%20S.A.V!5e0!3m2!1ses!2ses!4v1639765114758!5m2!1ses!2ses" width="100%" style={{border: 0}} allowFullScreen="" loading="lazy" title="grupo leti mapa"></iframe>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-6 Map__info">
                        <p>Esta planta está en permanente evolución y actualización, lo que nos permite ofrecer lo mejor para el país.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Map
