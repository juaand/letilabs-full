import './NotFoundPage.css'
import React from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet"

function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>Grupo Leti | 404</title>
            </Helmet>
            <main className="container NotFoundPage">
                <div className="row justify-content-center">
                    <div className="col-12 NotFoundPage__icon"></div>
                    <div className="col-11 col-sm-4 text-center">
                        <p>Lo sentimos, no encontramos la página que estás buscando.</p>
                        <Link to="/" className="leti-btn">Visita nuestro Home</Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFoundPage
