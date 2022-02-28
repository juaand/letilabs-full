import React from 'react'

import {seoURL} from '../../../../hooks/seoURL'
import './Nav.css'


function Nav({getActiveItem}) {

    const adminNav = ['Farmacovigilancia', 'Productos', 'Iniciativas']

    const clearInitActive = () => {
        const initActive = document.querySelector('.currentActive')
        const isActive = document.querySelectorAll('.active')

        if (initActive) {
            initActive.classList.remove('currentActive')
        }

        isActive.forEach(el => el.classList.remove('active'))
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
                    <li className={`AdminEditPage__Nav-link ${i === 0 ? "currentActive" : ""}`} onClick={(e) => {
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