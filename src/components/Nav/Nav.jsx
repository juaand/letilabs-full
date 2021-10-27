import './Nav.css'
import React from 'react'
import {NavLink} from 'react-router-dom'

function Nav() {
    return (
        <nav className="Nav navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse Nav__nav"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <NavLink activeClassName="active" className="nav-link" to="/sobre-nosotros">Sobre nosotros</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/nuestras-empresas">Nuestras empresas</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/investigacion-y-desarrollo">Investigación y desarrollo</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/proposito-y-responsabilidad-social">Propósito y responsabilidad social</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/nuestra-gente">Nuestra gente</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/productos">Productos</NavLink>
                        <NavLink activeClassName="active" className="nav-link" to="/noticias">Noticias</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
