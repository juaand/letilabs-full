import './Footer.css'
import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import dataNav from '../../data/dataNav'

function Footer() {

    const seoURL = (str) => {
        return str.toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()
            .replace(/&/g, '-and-')
            // eslint-disable-next-line
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-*/, '')
            .replace(/-*$/, '')
    }

    const [bool, setBool] = useState(false)

    useEffect(() => {
        if (window.screen.width <= 576) {
            setBool(!bool)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <footer className="container-fluid Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-sm-4">
                            <div className="Footer__logo"></div>
                            <div className="Footer__info">
                                <p>info@grupoleti.com</p>
                                <p>+580000000000</p>
                            </div>
                        </div>
                        <div className={`col-12 col-sm-4 Footer__nav ${bool && 'order-last'}`}>
                            <ul>

                                {dataNav.map(el =>
                                    <li>
                                        <NavLink activeClassName="active" className="nav-link" to={seoURL(el.nav_btn)}>{el.nav_btn}</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="col-6 col-sm-4 Footer__rrss">
                            <Link to="/" className="Footer__icon facebook"></Link>
                            <Link to="/" className="Footer__icon instagram"></Link>
                            <Link to="/" className="Footer__icon linkedin"></Link>
                        </div>
                    </div>
                </div>
            </footer>
            <section className="container-fluid">
                <div className="row">
                    <div className="col-12 Footer__copy"> Copyright {new Date().getFullYear()} © by Grupo Leti</div>
                </div>
            </section>
        </>
    )
}

export default Footer
