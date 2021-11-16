import './GenvenPage.css'
import React, {useEffect, Suspense} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'


function GenvenPage() {
    const Banner = React.lazy(() => import('./Banner/Banner'))
    const Video = React.lazy(() => import('./Video/Video'))
    const Timeline = React.lazy(() => import('./Timeline/Timeline'))
    const Equipo = React.lazy(() => import('./Equipo/Equipo'))
    const Productos = React.lazy(() => import('./Productos/Productos'))

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/genven',
        name: 'Genven'
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
            <Seo title='Grupo Leti | Genven' name='description' content="Genven Genéricos Venezolanos, es nuestra línea de genéricos de Laboratorios Leti S.A.V, con más de 25 años en el mercado farmacéutico venezolano." />
            <Suspense fallback={<Loader />}>
                <main>
                    <Banner />
                    <Video />
                    <Productos />
                    <Timeline />
                    <Equipo />
                </main>
            </Suspense>
        </>
    )
}

export default GenvenPage
