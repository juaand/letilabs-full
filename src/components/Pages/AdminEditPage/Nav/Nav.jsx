import './Nav.css'
import React from 'react'
import {useHistory} from 'react-router'
import {seoURL} from '../../../../hooks/seoURL'



function Nav({getActiveItem}) {

    const adminNav = ['Inicio', 'Sobre nosotros', 'Nuestras empresas', 'Investigación y desarrollo', 'Propósito y responsabilidad social', 'Nuestra gente', 'Productos', 'Noticias']

    let history = useHistory()

    const clearInitActive = () => {
        const initActive = document.querySelector('.currentActive')
        const isActive = document.querySelector('.active')

        if (initActive) {
            initActive.classList.remove('currentActive')
        }

        isActive.classList.remove('active')
    }

    function handleClick() {
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
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
    }

    return (

        <ul className="AdminEditPage__Nav">
            {adminNav.map((el, i) =>
                <li className={`AdminEditPage__Nav-link ${i === 0 ? "currentActive" : ""}`} onClick={(e) => {
                    getActiveItem(seoURL(el))
                    clearInitActive()
                    e.target.classList.add("active")
                }}>
                    {el}
                </li>
            )}
            <li className="AdminEditPage__Nav-link api" onClick={handleClick}>Subir contenido a la API</li>
        </ul>
    )
}

export default Nav