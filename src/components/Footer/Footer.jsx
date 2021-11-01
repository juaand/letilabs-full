import './Footer.css'
import React,  {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Footer() {

    const [bool, setBool] = useState(false)

    useEffect(() => {
        if (window.screen.width <= 576) {
            setBool(!bool)
        }
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
                                <li>
                                    <Link to="/sobre-nosotros">Sobre nosotros</Link>
                                </li>
                                <li>
                                    <Link to="/nuestras-empresas">Nuestras empresas</Link>
                                </li>
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
                    <div className="col-12 Footer__copy">Copyright by Grupo Leti</div>
                </div>
            </section>
        </>
    )
}

export default Footer
