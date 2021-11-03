import './Edit.css'
import React, {useEffect} from 'react'

function Edit() {

    useEffect(() => {
        document.title = "Grupo Leti | Edit"
    }, [])

    return (
        <>
            <h1>EDIT</h1>
        </>
    )
}

export default Edit
