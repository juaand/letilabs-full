import './OurCompanies.css'
import React, {useEffect, Suspense} from 'react'
import Seo from '../../Seo/Seo'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import Loader from '../../Loader/Loader'

function OurCompanies() {
    const Banner = React.lazy(() => import('./Banner/Banner'))
    const CompaniesInfo = React.lazy(() => import('./CompaniesInfo/CompaniesInfo'))
    const BannerProductos = React.lazy(() => import('./BannerProductos/BannerProductos'))
    const Innovar = React.lazy(() => import('./Innovar/Innovar'))
    const Cuidar = React.lazy(() => import('./Cuidar/Cuidar'))
    const BottomCta = React.lazy(() => import('./BottomCta/BottomCta'))

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
            <Seo title='Grupo Leti | Nuestras empresas' name='description' content='Nos conformamos por tres grandes unidades de negocio, que se dedican a diferentes áreas, pero trabajan entre ellas para lograr mejores resultados' />
            <Suspense fallback={<Loader />}>
                <main>
                    <Banner />
                    <CompaniesInfo />
                    <BannerProductos />
                    <Innovar />
                    <Cuidar />
                    <BottomCta />
                </main>
            </Suspense>
        </>
    )
}

export default OurCompanies
