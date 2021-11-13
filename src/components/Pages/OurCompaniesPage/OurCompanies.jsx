import './OurCompanies.css'
import React from 'react'
import Seo from '../../Seo/Seo'
import Banner from './Banner/Banner'

function OurCompanies() {

    return (
        <>
            <Seo title='Grupo Leti | Nuestras empresas' name='description' content='Esta página fue realizada por Andrés Martínez y Juan Romero' />
            <main>
                <Banner />
            </main>
        </>
    )
}

export default OurCompanies
