import './AdminEditPage.css'
import React from 'react'
import {useHistory} from 'react-router'
import Seo from '../../Seo/Seo'
import dataNav from '../../../data/dataNav'

function AdminEditPage() {
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
        <>
            <Seo title='Grupo Leti | Administrador' />
            <main className="container-fluid AdminEditPage">
                <div className="row">
                    <div className="col-2 p-0 AdminEditPage__Nav">
                        <ul>
                            {dataNav.map((el, i) =>
                                <li className={`AdminEditPage__Nav-link ${i === 0 ? "active" : ""}`}>
                                    {el.nav_btn}
                                </li>
                            )}
                            <li className="AdminEditPage__Nav-link" onClick={handleClick}>Subir contenido a la API</li>
                        </ul>
                    </div>
                    <div className="col-10">CONTENIDO</div>
                </div>
            </main>
        </>
    )
}

export default AdminEditPage
