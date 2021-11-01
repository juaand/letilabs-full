import './AboutUs.css'
import React from 'react'
import Header from '../../Header/Header'
import Banner from './Banner/Banner'
import MarcandoPauta from './MarcandoPauta/MarcandoPauta'
import Timeline from './Timeline/Timeline'

function AboutUs() {
    return (
        <main>
            <Banner />
            <MarcandoPauta />
            <Timeline />
        </main>
    )
}

export default AboutUs
