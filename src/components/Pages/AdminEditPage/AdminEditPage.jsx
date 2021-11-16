import './AdminEditPage.css'
import React, {Suspense} from 'react'
import {useHistory} from 'react-router'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'

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
            <Suspense fallback={<Loader />}>
                <main>
                    <h1>AdminEditPage</h1>
                    <div onClick={handleClick}>editar</div>
                </main>
            </Suspense>
        </>
    )
}

export default AdminEditPage
