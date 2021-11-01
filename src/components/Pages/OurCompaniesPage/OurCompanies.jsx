import './OurCompanies.css'
import React, {useEffect} from 'react'

function OurCompanies() {

    useEffect(() => {
        document.title = "Grupo Leti | Nuestras Empresas"
    }, [])

    return (
        <>
            <h1>NUESTRAS EMPRESAS</h1>
        </>
    )
}

export default OurCompanies
