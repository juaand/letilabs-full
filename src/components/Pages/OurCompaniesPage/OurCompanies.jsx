import './OurCompanies.css'
import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import Banner from './Banner/Banner'
import CompaniesInfo from './CompaniesInfo/CompaniesInfo'
import BannerProductos from './BannerProductos/BannerProductos'
import Innovar from './Innovar/Innovar'
import Cuidar from './Cuidar/Cuidar'
import BottomCta from './BottomCta/BottomCta'


function OurCompanies() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/nuestras-empresas',
        name: 'Nuestras empresas'
    }

    useEffect(() => {
        if (user) {
            const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
            mainContent.forEach(content => {
                data.content.push(content.innerText)
            })

            const fetchData = async () => {
                await createContent(data)
            }
            fetchData()
        }

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Nuestras empresas</title>
                <meta name="description" content="Nos conformamos por tres grandes unidades de negocio, que se dedican a diferentes áreas, pero trabajan entre ellas para lograr mejores resultados" />
                <meta name="keywords" content="Grupo Leti,  Nuestras empresas, Leti" />
            </Helmet>
            <main>
                <Banner />
                <CompaniesInfo />
                <BannerProductos />
                <Innovar />
                <Cuidar />
                <BottomCta />
            </main>
        </>
    )
}

export default OurCompanies
