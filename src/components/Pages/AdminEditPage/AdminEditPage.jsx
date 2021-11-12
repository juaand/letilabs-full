import './AdminEditPage.css'
import React from 'react'
import {useHistory} from 'react-router'
import {Helmet} from "react-helmet"

function AdminEditPage() {
    let history = useHistory()

    function handleClick() {
        setTimeout(() => {history.push("/")}, 1)
        setTimeout(() => {history.push("/sobre-nosotros")}, 1)
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1)
    }

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Administrador</title>
            </Helmet>
            <main>
                <h1>AdminEditPage</h1>
                <div onClick={handleClick}>editar</div>
            </main>
        </>
    )
}

export default AdminEditPage
