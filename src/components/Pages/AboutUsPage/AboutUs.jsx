import './AboutUs.css'
import React from 'react'
import Banner from './Banner/Banner'
import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'
import Megat from './Megat/Megat'

function AboutUs() {
    return (
        <main>
            <Banner />
            <MarcandoPauta />
            <Timeline />
            <Megat />
        </main>
    )
}

export default AboutUs
