import './Header.css'
import React from 'react'
import Nav from '../Nav/Nav'
import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <>
            <header className="Header">
                <div className="container">
                    <div className="row justify-content-between Header__logo">
                        <div className="col-12 d-flex justify-content-center">
                            <NavLink className="navbar-brand" to="/"></NavLink>
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
                <Nav />
            </header>
        </>
    )
}

export default Header
