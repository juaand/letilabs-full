import './LaboratoriosLetiPage.css'
import React, {useEffect, Suspense} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'


function LaboratoriosLetiPage() {
    const Banner = React.lazy(() => import('./Banner/Banner'))
    const InfoCards = React.lazy(() => import('./InfoCards/InfoCards'))
    const Timeline = React.lazy(() => import('./Timeline/Timeline'))
    const Equipo = React.lazy(() => import('./Equipo/Equipo'))

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/laboratorios-leti',
        name: 'Laboratorios Leti'
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

        const isCloseSearch = document.querySelector('.Header__search-close')
        if (isCloseSearch) {
            isCloseSearch.classList.remove('Header__search-close')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Seo title='Grupo Leti | Laboratorios Leti' name='description' content="Esta es la unidad que se encarga de desarrollar la gama de productos que abarca diferentes áreas terapéuticas: cardiovascular, metabolismo, gástrica, respiratoria, neurológicas, músculo-esqueléticas, dolor, antibióticos, vitaminas, tanto para el paciente pediátrico como para el paciente adulto." />
            <Suspense fallback={<Loader />}>
                <main>
                    <Banner />
                    <InfoCards />
                    <Timeline />
                    <Equipo />
                </main>
            </Suspense>
        </>
    )
}

export default LaboratoriosLetiPage
