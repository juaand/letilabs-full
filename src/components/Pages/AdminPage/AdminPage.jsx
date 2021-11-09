import './AdminPage.css'
import React, {useEffect} from 'react'

function AdminPage(props) {

    const title = props.title || 'Administrador'

    useEffect(() => {
        document.title = `Grupo Leti | ${title}`
    }, [])

    return (
        <main className="container">
            <h1>AdminPage</h1>
        </main>
    )
}

export default AdminPage
