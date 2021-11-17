import './Nav.css'
import React from 'react'
import {useHistory} from 'react-router'
import dataNav from '../../../../data/dataNav'
import {seoURL} from '../../../../hooks/seoURL'


function Nav({getActiveItem}) {
    
    let history = useHistory()

    function handleClick() {
        setTimeout(() => {history.push("/")}, 1)
        setTimeout(() => {history.push("/sobre-nosotros")}, 1)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
        setTimeout(() => {history.push("/nuestras-empresas")}, 1)
        setTimeout(() => {history.push("/laboratorios-leti")}, 1)
        setTimeout(() => {history.push("/genven")}, 1)
        setTimeout(() => {history.push("/biocontrolled")}, 1)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
    }
    
    return (

        <ul className=" AdminEditPage__Nav">
            {dataNav.map((el, i) =>
                <li className={`AdminEditPage__Nav-link ${i === 0 ? "active" : ""}`} onClick={() => getActiveItem(seoURL(el.nav_btn))}>
                    {el.nav_btn}
                </li>
            )}
            <li className="AdminEditPage__Nav-link api" onClick={handleClick}>Subir contenido a la API</li>
        </ul>
    )
}

export default Nav
