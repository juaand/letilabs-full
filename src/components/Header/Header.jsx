import './Header.css'
import React, {useState} from 'react'
import Nav from '../Nav/Nav'
import {NavLink} from 'react-router-dom'

function Header() {

    const [bool, setBool] = useState(false)

    const showSearch = () => {
        setBool(!bool)
    }

    return (
        <>
            <header className="Header">
                <div className="container">
                    <div className="row justify-content-between Header__logo">
                        <div className="col-12 d-flex justify-content-center">
                            <NavLink className="navbar-brand" to="/"></NavLink>
                            <div onClick={showSearch} className={`Header__search ${bool && 'Header__search-close'}`}></div>
                        </div>
                    </div>
                </div>
                <Nav />
            </header>
                <section className={`container-fluid Search ${bool && 'show'}`}>
                    <form className="container d-flex align-items-center">
                        <div className="Search__form">
                            <input
                                className="Search__form-input form-control me-2"
                                type="search"
                                placeholder="Buscar..."
                                aria-label="Search"
                            />
                        </div>
                        <button type="submit">BUSCAR</button>
                    </form>
                </section>
            
        </>
    )
}

export default Header
