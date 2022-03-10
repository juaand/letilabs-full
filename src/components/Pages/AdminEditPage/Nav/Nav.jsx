import './Nav.css'
import React from 'react'
import {useHistory} from 'react-router'
import {seoURL} from '../../../../hooks/seoURL'

function Nav({getActiveItem}) {

    const adminNav = ['Inicio', 'Sobre nosotros', 'Áreas Terapéuticas', 'Nuestras empresas', 'Leti', 'Genven', 'Biocontrolled', 'Investigación y desarrollo', 'Tecnología', 'Manufactura', 'Alianzas', 'Propósito y responsabilidad social', 'Nuestra gente', 'Nuestra filosofía', 'Productos', 'Listado de productos','Noticias', 'Etiquetas']

    const subAdminNav = ['Áreas Terapéuticas', 'Leti', 'Genven', 'Biocontrolled', 'Tecnología', 'Manufactura', 'Alianzas', 'Listado de productos', 'Etiquetas']

    let history = useHistory()

    const clearInitActive = () => {
        const initActive = document.querySelector('.currentActive')
        const isActive = document.querySelectorAll('.active')

        if (initActive) {
            initActive.classList.remove('currentActive')
        }

        isActive.forEach(el => el.classList.remove('active'))
    }
   

    function handleClick() {
        setTimeout(() => {history.push("/")}, 1)
        setTimeout(() => {history.push("/sobre-nosotros")}, 17000)
        setTimeout(() => {history.push("/nuestras-empresas")}, 34000)
        setTimeout(() => {history.push("/leti")}, 51000)
        setTimeout(() => {history.push("/genven")}, 68000)
        setTimeout(() => {history.push("/biocontrolled")}, 85000)
        setTimeout(() => {history.push("/areas-terapeuticas")}, 102000)
        setTimeout(() => {history.push("/investigacion-y-desarrollo")}, 119000)
        setTimeout(() => {history.push("/tecnologia")}, 136000)
        setTimeout(() => {history.push("/manufactura")}, 153000)
        setTimeout(() => {history.push("/alianzas")}, 170000)
        setTimeout(() => {history.push("/proposito-y-responsabilidad-social")}, 187000)
        setTimeout(() => {history.push("/nuestra-gente")}, 204000)
        setTimeout(() => {history.push("/nuestra-filosofia")}, 221000)
        setTimeout(() => {history.push("/productos")}, 238000)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 255000)
    }

    const checkSubNav = (tag) => {
        for (let i = 0; i < adminNav.length; i++) {
            for (let j = 0; j < subAdminNav.length; j++) {
                if (adminNav[i] === tag && subAdminNav[j] === tag) {
                    return 'AdminEditPage__Nav-link-subnav'
                }
            }
        }
    }

    const showAdminMenu = () => {
        document.querySelector('.AdminEditPage__Nav').classList.toggle('AdminEditPage__Nav-active')
        document.querySelector('.AdminEditPage__adminmenu').classList.toggle('AdminEditPage__adminmenu-active')
        
    }

    return (
        <>
        <div className="d-block d-sm-none AdminEditPage__adminmenu" onClick={showAdminMenu}>Menu admin</div>
            <ul className="AdminEditPage__Nav">
                {adminNav.map((el, i) =>
                    <li className={`AdminEditPage__Nav-link ${i === 0 ? "currentActive" : ""} ${checkSubNav(el)}`} onClick={(e) => {
                        clearInitActive()
                        getActiveItem(seoURL(el))
                        e.target.classList.add("active")
                    }}>
                        {el}
                    </li>
                )}
                <li className="AdminEditPage__Nav-link api" onClick={handleClick}>Subir contenido a la API</li>
            </ul>
        </>
    )
}

export default Nav