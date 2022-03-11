import './Nav.css'
import React from 'react'

import {seoURL} from '../../../../hooks/seoURL'

function Nav({getActiveItem}) {

    const adminNav = ['Inicio', 'Sobre nosotros', 'Áreas Terapéuticas', 'Nuestras empresas', 'Leti', 'Genven', 'Biocontrolled', 'Investigación y desarrollo', 'Tecnología', 'Manufactura', 'Alianzas', 'Propósito y responsabilidad social', 'Nuestra gente', 'Nuestra filosofía', 'Productos', 'Listado de productos','Noticias', 'Etiquetas']

    const subAdminNav = ['Áreas Terapéuticas', 'Leti', 'Genven', 'Biocontrolled', 'Tecnología', 'Manufactura', 'Alianzas', 'Listado de productos', 'Etiquetas']

    const clearInitActive = () => {
        const initActive = document.querySelector('.currentActive')
        const isActive = document.querySelectorAll('.active')

        if (initActive) {
            initActive.classList.remove('currentActive')
        }

        isActive.forEach(el => el.classList.remove('active'))
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
            </ul>
        </>
    )
}

export default Nav