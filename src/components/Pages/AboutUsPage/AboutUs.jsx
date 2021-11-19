import './AboutUs.css'
import React, {useEffect} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'
import Megat from './Megat/Megat'
import Gallery from './Gallery/Gallery'

function AboutUs() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/sobre-nosotros',
        name: 'Sobre nosotros'
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Sobre nosotros</title>
                <meta name="description" content="Laboratorios Leti es un laboratorio farmacéutico venezolano que desde hace 70 años, crea soluciones de salud a través de la producción y comercialización de un amplio portafolio de medicamentos desarrollados con tecnología y seguridad, de la mano de un talento humano caliﬁcado que trabaja día a día para acompañar a los venezolanos." />
                <meta name="keywords" content="Grupo Leti, Sobre nosotros" />
            </Helmet>
            <main>
                <Banner />
                <MarcandoPauta />
                <Timeline />
                <Gallery />
                <Megat />
            </main>
        </>
    )
}

export default AboutUs
