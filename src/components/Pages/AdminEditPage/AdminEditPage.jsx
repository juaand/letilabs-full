import './AdminEditPage.css'
import React from 'react'
import {useHistory} from 'react-router'
import Seo from '../../Seo/Seo'

function AdminEditPage() {
    let history = useHistory()

    function handleClick() {
        setTimeout(() => {history.push("/")}, 1)
        setTimeout(() => {history.push("/sobre-nosotros")}, 1)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
        setTimeout(() => {history.push("/nuestras-empresas")}, 1)
        setTimeout(() => {history.push("/laboratorios-leti")}, 1)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
    }

    return (
        <>
            <Seo title='Grupo Leti | Administrador' />
            <main>
                <h1>AdminEditPage</h1>
                <div onClick={handleClick}>editar</div>
            </main>
        </>
    )
}

export default AdminEditPage
