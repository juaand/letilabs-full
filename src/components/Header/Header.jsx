import './Header.css'
import React, {useState} from 'react'
import Nav from '../Nav/Nav'
import {NavLink} from 'react-router-dom'
import Search from '../Form/Search/Search'

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
                            <NavLink onClick={() => setBool(false)} className="navbar-brand" to="/" />
                            <div onClick={showSearch} className={`Header__search ${bool && 'Header__search-close'}`}></div>
                        </div>
                    </div>
                </div>
                <Nav initSearch={() => setBool(false)} />
            </header>
            <Search bool={bool} />
        </>
    )
}

export default Header
