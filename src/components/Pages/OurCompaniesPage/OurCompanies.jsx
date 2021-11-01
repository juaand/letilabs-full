import './OurCompanies.css'
import React, {useState, useEffect} from 'react'
import Header from '../../Header/Header'

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
