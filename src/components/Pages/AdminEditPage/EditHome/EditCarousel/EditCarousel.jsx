import './EditCarousel.css'
import React from 'react'
import {Link} from 'react-router-dom'

function EditCarousel() {
    return (
        <>
            <section className="container-fluid EditContent EditCarousel">
                <h2>Añadir o editar productos del carrusel</h2>
                <p>Para añadir productos al carrusel, haga click en <Link to="/admin-productos">Productos</Link> en la botonera superior.</p>
            </section>
        </>
    )
}

export default EditCarousel
