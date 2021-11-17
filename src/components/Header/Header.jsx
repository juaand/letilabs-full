import './Header.css'
import React, {useState} from 'react'
import Nav from '../Nav/Nav'
import {NavLink, useLocation} from 'react-router-dom'
import Search from '../Form/Search/Search'
import {useAuthContext} from '../../contexts/AuthContext'
import {useHistory} from 'react-router-dom'

function Header() {

    const location = useLocation()
    const history = useHistory()

    const {user} = useAuthContext()
    const {logout} = useAuthContext()

    const [bool, setBool] = useState(false)
    const [hideOnDevice, setHideOnDevice] = useState(false)

    const showSearch = () => {
        setBool(!bool)

        if (window.screen.width <= 576) {
            setHideOnDevice(!hideOnDevice)
        }
    }

    const logoutUser = () => {
        logout()
        history.push({
            pathname: '/login'
        })
    }

    const isSearchPage = location.pathname === '/buscar'


    return (
        <>
            <header className="Header">
                <div className={user ? "container-fluid" : "container"}>
                    <div className="row justify-content-between Header__logo">
                        <div className="col-12 d-flex justify-content-between">
                            {user && user.role === 'Admin' &&
                                <div className="Header__welcome d-none d-sm-flex">
                                    Hola, <span className="Header__welcome-span">{user.name}</span>
                                </div>
                            }
                            <NavLink onClick={() => setBool(false)} className="navbar-brand" to={`${user ? "/admin" : "/"}`} />
                            {!user && <div onClick={showSearch} className={`Header__search ${bool && 'Header__search-close'} ${isSearchPage && 'd-none'}`}></div>}
                            {user && <div onClick={logoutUser} className="Header__logout d-none d-sm-flex"></div>}
                        </div>
                    </div>
                </div>
                {!hideOnDevice && <Nav initSearch={() => setBool(false)} />}
            </header>
            <Search bool={bool} />
        </>
    )
}

export default Header
