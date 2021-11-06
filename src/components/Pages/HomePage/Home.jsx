import './Home.css'
import React, {useEffect} from 'react'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import Portafolio from './Portafolio/Portafolio'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'


function Home() {

    useEffect(() => {
        document.title = "Grupo Leti | Inicio"

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }
        
    }, [])

    return (
        <main>
            <Video />
            <UsInfo />
            <Carousel />
            <Unidades />
            <Portafolio />
            <FarmacoVigilancia />
        </main>
    )
}

export default Home
