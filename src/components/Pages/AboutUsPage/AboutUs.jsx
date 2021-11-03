import './AboutUs.css'
import React, {useEffect} from 'react'
import Banner from './Banner/Banner'
import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'
import Megat from './Megat/Megat'
import Gallery from './Gallery/Gallery'

function AboutUs() {

    useEffect(() => {
        document.title = "Grupo Leti | Sobre nosotros"
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
