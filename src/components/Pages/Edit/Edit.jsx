import './Edit.css'
import React, {useState, useEffect} from 'react'

function Edit({user}) {


    const [userData] = useState(user)

    console.log(userData)

    useEffect(() => {
        document.title = "Grupo Leti | Edit"
    }, [])

    return (
        <main className="container">
            <h1>EDIT</h1>
        </main>
    )
}

export default Edit
