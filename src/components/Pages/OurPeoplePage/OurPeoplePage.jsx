import './OurPeoplePage.css'
import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import Banner from './Banner/Banner'

function OurPeoplePage() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/nuestra-gente',
        name: 'Nuestra gente'
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
                <title>Grupo Leti | Nuestra gente</title>
                <meta name="description" content="Contamos con un talento humano especializado que tienen años trabajando en el campo, y más importante, trabajando con nosotros." />
                <meta name="keywords" content="Grupo Leti,  Nuestra gente" />
            </Helmet>
            <main>
                <Banner />
            </main>
        </>
    )
}

export default OurPeoplePage
