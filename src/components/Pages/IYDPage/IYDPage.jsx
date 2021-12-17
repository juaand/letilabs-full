import React, {useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import InfoCards from './InfoCards/InfoCards'
import BottomCta from './BottomCta/BottomCta'

function IYDPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/investigacion-y-desarrollo',
        name: 'Investigación y desarrollo',
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
                <title>Grupo Leti | Investigación y desarrollo</title>
                <meta name="description" content="Para nosotros siempre ha sido prioridad contar con la tecnlogía e infraestructura que nos permita desarrollar los mejores productos, y además en las cantidades necesarias para cuidar de la salud de todo el país." />
                <meta name="keywords" content="Grupo Leti, Investigación y desarrollo" />
            </Helmet>
            <main>
                <Banner />
                <InfoCards />
                <BottomCta />
            </main>
        </>
    )
}

export default IYDPage
