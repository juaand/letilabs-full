import React, {useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import InfoCards from './InfoCards/InfoCards'
import Letter from './Letter/Letter'

function OurPhilosophyPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/nuestra-filosofia',
        name: 'Nuestra filosofía',
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
                <title>Grupo Leti | Nuestra filosofía</title>
                <meta name="description" content="Todos los líderes de cada unidad y demás áreas de trabajo, trabajan en conjunto para promover la relación de sinergia entre todas las empresas y así lograr los mejores resultados. Contamos con un talento humano excepcional y altamente calificado que trabaja día a día generando soluciones para los venezolanos, bajo los principios y ética del grupo.." />
                <meta name="keywords" content="Grupo Leti, Nuestra filosofía" />
            </Helmet>
            <main>
                <Banner />
                <InfoCards />
                <Letter />
            </main>
        </>
    )
}

export default OurPhilosophyPage
