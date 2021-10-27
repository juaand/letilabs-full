import './Header.css'
import React from 'react'

function Header() {
    return (
        <header className="Header">
            <div className="container">
                <div className="row justify-content-between Header__logo">
                    <div className="col-12 d-flex justify-content-center">
                        <a className="navbar-brand" href="#"></a>
                        <form className="d-flex Header__search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
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
                        className="collapse navbar-collapse Header__nav"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <a className="nav-link" href="#">Sobre nosotros</a>
                            <a className="nav-link" href="#">Nuestras empresas</a>
                            <a className="nav-link" href="#">Investigación y desarrollo</a>
                            <a className="nav-link" href="#"
                            >Propósito y responsabilidad social</a
                            >
                            <a className="nav-link" href="#">Nuestra gente</a>
                            <a className="nav-link" href="#">Productos</a>
                            <a className="nav-link" href="#">Noticias</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
