import React, {useState} from 'react'
import {NavLink, useLocation, useHistory} from 'react-router-dom'

import {useAuthContext} from '../../contexts/AuthContext'
import Search from '../Form/Search/Search'
import Nav from '../Nav/Nav'

import './Header.css'

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
        setTimeout(() => {history.push("/")}, 1)
        setTimeout(() => {history.push("/sobre-nosotros")}, 1)
        setTimeout(() => {history.push("/nuestras-empresas")}, 1)
        setTimeout(() => {history.push("/leti")}, 1)
        setTimeout(() => {history.push("/genven")}, 1)
        setTimeout(() => {history.push("/biocontrolled")}, 1)
        setTimeout(() => {history.push("/areas-terapeuticas")}, 1)
        setTimeout(() => {history.push("/investigacion-y-desarrollo")}, 1)
        setTimeout(() => {history.push("/tecnologia")}, 1)
        setTimeout(() => {history.push("/manufactura")}, 1)
        setTimeout(() => {history.push("/alianzas")}, 1)
        setTimeout(() => {history.push("/proposito-y-responsabilidad-social")}, 1)
        setTimeout(() => {history.push("/nuestra-gente")}, 1)
        setTimeout(() => {history.push("/nuestra-filosofia")}, 1)
        setTimeout(() => {history.push("/productos")}, 1)
        setTimeout(() => {logout()}, 1)
        setTimeout(() => {
            history.push({
                pathname: '/login'
            })
        }, 1)
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
                            <NavLink onClick={() => setBool(false)} className="navbar-brand" to={`${user ? "/admin-editar-contenido" : "/"}`} />
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
