import './BiocontrolledPage.css'
import React, {useEffect} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Banner from './Banner/Banner'
import InfoCards from './InfoCards/InfoCards'
import Timeline from './Timeline/Timeline'
import Equipo from './Equipo/Equipo'


function BiocontrolledPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/biocontrolled',
        name: 'Biocontrolled'
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
            <Seo title='Grupo Leti | Biocontrolled' name='description' content="Esta es la unidad de explorar nuevas maneras y eficaces maneras de desarrollar medicamentos, gracias a Biocontrolled es que nos mantenemos a la vanguardia y podemos seguir ofreciendo productos cada vez más beneficiosos." />
            <main>
                <Banner />
                <InfoCards />
                <Timeline />
                <Equipo />
            </main>
        </>
    )
}

export default BiocontrolledPage
