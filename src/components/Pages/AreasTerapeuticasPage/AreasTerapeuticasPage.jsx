import './AreasTerapeuticasPage.css'
import React, {useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import BottomCta from './BottomCta/BottomCta'
import VerticalCarousel from './VerticalCarousel/VerticalCarousel'

function AreasTerapeuticasPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/areas-terapeuticas',
        name: 'Áreas terapéuticas',
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
                <title>Grupo Leti | Áreas terapéuticas</title>
                <meta name="description" content="Esta es la unidad de explorar nuevas maneras y eficaces maneras de desarrollar medicamentos, gracias a Biocontrolled es que nos mantenemos a la vanguardia y podemos seguir ofreciendo productos cada vez más beneficiosos." />
                <meta name="keywords" content="Grupo Leti, Áreas Terapéuticas" />
            </Helmet>
            <main>
                <Banner />
                <VerticalCarousel />
                <BottomCta />
            </main>
        </>
    )
}

export default AreasTerapeuticasPage
