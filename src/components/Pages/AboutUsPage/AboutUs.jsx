import './AboutUs.css'
import React, {useEffect} from 'react'
import Banner from './Banner/Banner'
import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'
import Megat from './Megat/Megat'
import Gallery from './Gallery/Gallery'
import {createContent} from '../../../services/ApiClient'

function AboutUs(props) {

    const data = {
        content: [],
        url: '/sobre-nosotros',
        name: 'Sobre nosotros'
    }

    const title = props.title || 'Sobre nosotros'

    useEffect(() => {
        const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
        mainContent.forEach(content => {
            data.content.push(content.innerHTML)
        })

        const fetchData = async () => {
            await createContent(data)
        }
        fetchData()

        document.title = `Grupo Leti | ${title}`

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <Banner />
            <MarcandoPauta />
            <Timeline />
            <Gallery />
            <Megat />
        </main>
    )
}

export default AboutUs
