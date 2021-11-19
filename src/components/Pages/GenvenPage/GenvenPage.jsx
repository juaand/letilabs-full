import './GenvenPage.css'
import React, {Suspense, useEffect} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Banner from './Banner/Banner'
import Video from './Video/Video'
import Timeline from './Timeline/Timeline'
import Equipo from './Equipo/Equipo'
import Productos from './Productos/Productos'


function GenvenPage() {

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
            <main>
                <Banner />
                <Video />
                <Productos />
                <Timeline />
                <Equipo />
            </main>
        </>
    )
}

export default GenvenPage
