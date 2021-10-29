import './Home.css'
import React from 'react'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import Portafolio from './Portafolio/Portafolio'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'


function Home() {
    return (
        <>
            <main>
                <Video />
                <UsInfo />
                <Carousel />
                <Unidades />
                <Portafolio />
                <FarmacoVigilancia/>
            </main>
        </>
    )
}

export default Home
