import './OurCompanies.css'
import React, {useEffect} from 'react'


function OurCompanies(props) {

    const title = props.title || 'Nuestras empresas'


    useEffect(() => {
        document.title = `Grupo Leti | ${title}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>NUESTRAS EMPRESAS</h1>
            
        </>
    )
}

export default OurCompanies
