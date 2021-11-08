import './AdminPage.css'
import React, {useEffect} from 'react'

function AdminPage({user}) {

    useEffect(() => {
        document.title = "Grupo Leti"
    }, [])

    return (
        <main className="container">
            <h1>AdminPage</h1>
        </main>
    )
}

export default AdminPage
