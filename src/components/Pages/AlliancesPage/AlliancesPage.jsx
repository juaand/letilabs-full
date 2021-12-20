import './AlliancesPage.css'
import React, {useEffect} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import Carousel from './Carousel/Carousel'
import BottomCta from './BottomCta/BottomCta'
import AllianceForm from './AllianceForm/AllianceForm'


function AlliancesPage() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/alianzas',
        name: 'Alianzas'
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
                <title>Grupo Leti | Alianzas</title>
                <meta name="description" content="Para lograr nuestro propósito de cuidar de la salud de los venezolanos, es importante contar con aliados que aporten al proceso y nos ayuden a ofrecer lo mejor." />
                <meta name="keywords" content="Grupo Leti, Alianzas" />
            </Helmet>
            <main>
                <Banner />
                <Carousel />
                <AllianceForm />
                <BottomCta />
            </main>
        </>
    )
}

export default AlliancesPage
