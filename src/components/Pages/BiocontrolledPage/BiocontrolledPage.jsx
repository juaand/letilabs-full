import './BiocontrolledPage.css'
import React, {useEffect, Suspense} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'


function BiocontrolledPage() {

    const Banner = React.lazy(() => import('./Banner/Banner'))
    const InfoCards = React.lazy(() => import('./InfoCards/InfoCards'))
    const Timeline = React.lazy(() => import('./Timeline/Timeline'))
    const Equipo = React.lazy(() => import('./Equipo/Equipo'))
    const Carousel = React.lazy(() => import('./Carousel/Carousel'))

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/biocontrolled',
        name: 'Biocontrolled'
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
            <Seo title='Grupo Leti | Biocontrolled' name='description' content="Esta es la unidad de explorar nuevas maneras y eficaces maneras de desarrollar medicamentos, gracias a Biocontrolled es que nos mantenemos a la vanguardia y podemos seguir ofreciendo productos cada vez más beneficiosos." />
            <Suspense fallback={<Loader />}>
                <main>
                    <Banner />
                    <InfoCards />
                    <Carousel />
                    <Timeline />
                    <Equipo />
                </main>
            </Suspense>
        </>
    )
}

export default BiocontrolledPage
