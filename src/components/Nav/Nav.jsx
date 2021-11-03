import './Nav.css'
import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import dataNav from '../../data/dataNav'

function Nav({initSearch}) {

    const seoURL = (str) => {
        return str.toString()         // Convert to string
            .normalize('NFD')               // Change diacritics
            .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
            .replace(/\s+/g, '-')            // Change whitespace to dashes
            .toLowerCase()                  // Change to lowercase
            .replace(/&/g, '-and-')          // Replace ampersand
            .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
            .replace(/-+/g, '-')             // Remove duplicate dashes
            .replace(/^-*/, '')              // Remove starting dashes
            .replace(/-*$/, '')             // Remove trailing dashes
    }

    const [subNavData, setSubNavData] = useState()
    const [subNavSet, setSubNavSet] = useState({})
    const [bool, setBool] = useState(false)
    const [isDevice, setIsDevice] = useState(false)

    const showSubNav = (e, data) => {

        console.log('hago click')

        e.target.classList.add('open')

        if (e.target.classList.contains('open')) {
            setBool(true)
        }

        setSubNavData(data)
    }

    const hideMenu = () => {
        console.log('kk')
        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
            setBool(!bool)
        }
    }

    useEffect(() => {

        if (window.screen.width <= 576) {
            setIsDevice(!isDevice)
        }

        const getNavW = document.querySelector('.navbar-nav').offsetWidth
        const getNavH = document.querySelector('.navbar-nav').offsetHeight
        const getNav = document.querySelector('.navbar-nav').getBoundingClientRect()

        setSubNavSet({
            width: getNavW,
            height: getNavH,
            top: getNavH,
            x: getNav.x
        })

    }, [])

    return (
        <section className="Nav" onMouseLeave={() => setBool(false)}>
            <nav className="navbar navbar-expand-lg navbar-light p-0">
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
                            {dataNav.map(el =>
                                <NavLink onMouseOver={(e) => showSubNav(e, el)} onClick={initSearch} activeClassName="active" className="nav-link" to={seoURL(el.nav_btn)}>{el.nav_btn}</NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {bool &&
                <div className="container Nav__sub-nav-container" onMouseLeave={() => setBool(!bool)}>
                    <div className="Nav__sub-nav" style={{
                        width: subNavSet.width,
                        left: subNavSet.x,
                        top: subNavSet.top
                    }}>
                        <div className="row">
                            <div className="col-12 col-sm-4 Nav__sub-nav-info">
                                {isDevice && <p onClick={() => setBool(!bool)} className="Nav__sub-nav-device">Atrás</p>}
                                <h3>{subNavData.title}</h3>
                                <p>{subNavData.desc}</p>
                                <Link onClick={hideMenu} className="Nav__sub-nav-cta" to={seoURL(subNavData.nav_btn)}>{subNavData.nav_cta}</Link>
                            </div>
                            <div className="col-12 col-sm-4 Nav__sub-nav-anchors">
                                {subNavData.sub_nav.map(el =>
                                    <Link onClick={hideMenu} to={`${seoURL(subNavData.nav_btn)}#${seoURL(el.sub_text)}`}>{el.sub_text}</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default Nav
