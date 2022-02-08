import './PurposePage.css'
import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import Banner from './Banner/Banner'
import Video from './Video/Video'
import Timeline from './Timeline/Timeline'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'

function PurposePage() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/proposito-y-responsabilidad-social',
        name: 'Propósito y Responsabilidad Social'
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
                <title>Grupo Leti | Propósito y responsabilidad social</title>
                <meta name="description" content="Ratificamos nuestro compromiso con Venezuela para marcar la diferencia en la vida de todos los venezolanos, acompañándolos en todo momento." />
                <meta name="keywords" content="Grupo Leti,  Propósito y responsabilidad social" />
            </Helmet>
            <main>
                <Banner />
                <Video />
                <Timeline />
                <FarmacoVigilancia />
            </main>
        </>
    )
}

export default PurposePage
