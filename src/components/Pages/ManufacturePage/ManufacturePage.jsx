import './ManufacturePage.css'
import React, {useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import BottomCta from './BottomCta/BottomCta'
import Carousel from './Carousel/Carousel'
import Certificate from './Certificate/Certificate'

function ManufacturePage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/manufactura',
        name: 'Manufactura',
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
            <Helmet>
                <title>Grupo Leti | Manufactura</title>
                <meta name="description" content="Diariamente se manufacturan XX cantidades de todo tipo de medicinas, que salen de la planta para ser distribuidos en todo el país." />
                <meta name="keywords" content="Grupo Leti, Manufactura" />
            </Helmet>
            <main>
                <Banner />
                <Carousel />
                <Certificate />
                <BottomCta />
            </main>
        </>
    )
}

export default ManufacturePage
