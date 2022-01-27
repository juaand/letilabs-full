import './TechPage.css'
import React, {useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import Video from './Video/Video'
import Map from './Map/Map'
import BottomCta from './BottomCta/BottomCta'
import Timeline from './Timeline/Timeline'

function TechPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/tecnologia',
        name: 'Tecnología',
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
                <title>Grupo Leti | Tecnología</title>
                <meta name="description" content="Nuestra planta está ubicada en Guarenas, estado Miranda, y es la planta producción de fármacos más grande a nivel nacional. Cuenta con la única planta de cefalosporínicos existentes en Venezuela y una de las pocas penicilínicos, siendo modelo de Latinoamérica." />
                <meta name="keywords" content="Grupo Leti, Tecnología" />
            </Helmet>
            <main className="Tech">
                <Banner />
                <Video />
                <Timeline/>
                <Map />
                <BottomCta />
            </main>
        </>
    )
}

export default TechPage
