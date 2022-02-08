import './Footer.css'
import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import dataNav from '../../data/dataNav'
import {useAuthContext} from '../../contexts/AuthContext'
import {seoURL} from '../../hooks/seoURL'

function Footer() {

    const {user} = useAuthContext()

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
                            <Link to={`${user ? "/admin-editar-contenido" : "/"}`}>
                                <div className="Footer__logo"></div>
                            </Link>
                            <div className="Footer__info">
                                <ul>
                                    <li>
                                        <a href="mailto:comunicaciones.leti@leti.com.ve">comunicaciones.leti@leti.com.ve</a>
                                    </li>
                                    <li>
                                        <a href="tel:+582123602511">+582123602511</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`col-12 col-sm-4 Footer__nav ${bool && 'order-last'}`}>
                            <ul>
                                {!user && dataNav.map(el =>
                                    <li>
                                        <NavLink activeClassName="active" className="nav-link" to={seoURL(el.nav_btn)}>{el.nav_btn}</NavLink>
                                    </li>
                                )}
                                {user && user.role === 'Admin' &&
                                    <>
                                        <li>
                                            <NavLink activeClassName="active" className="nav-link" to="/admin-farmacovigilancia">Farmaco vigilancia</NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" className="nav-link" to="/admin-editar-contenido">Editar contenido</NavLink>
                                        </li>
                                    </>
                                }
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
