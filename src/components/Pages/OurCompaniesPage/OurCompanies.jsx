import './OurCompanies.css'
import React from 'react'
import Seo from '../../Seo/Seo'
import Banner from './Banner/Banner'
import CompaniesInfo from './CompaniesInfo/CompaniesInfo'
import BannerProductos from './BannerProductos/BannerProductos'

function OurCompanies() {

    return (
        <>
            <Seo title='Grupo Leti | Nuestras empresas' name='description' content='Esta página fue realizada por Andrés Martínez y Juan Romero' />
            <main>
                <Banner />
                <CompaniesInfo />
                <BannerProductos />
            </main>
        </>
    )
}

export default OurCompanies
