import './OurCompanies.css'
import React, {useEffect} from 'react'

function OurCompanies(props) {

    const title = props.title || 'Nuestras empresas'

    useEffect(() => {
        document.title = `Grupo Leti | ${title}`
    }, [])

    return (
        <>
            <h1>NUESTRAS EMPRESAS</h1>
        </>
    )
}

export default OurCompanies
