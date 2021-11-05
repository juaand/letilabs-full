import './AdminPage.css'
import React, {useState, useEffect} from 'react'

function AdminPage({user}) {


    const [userData] = useState(user)

    console.log(userData)

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
