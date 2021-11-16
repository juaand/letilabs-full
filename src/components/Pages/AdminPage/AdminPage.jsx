import './AdminPage.css'
import React, {Suspense} from 'react'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'

function AdminPage() {

    return (
        <>
            <Seo title='Grupo Leti | Administrador' />
            <Suspense fallback={<Loader/>}>
            <main className="container">
                <h1>AdminPage</h1>
            </main>
            </Suspense>
        </>
    )
}

export default AdminPage
