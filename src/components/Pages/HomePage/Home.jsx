import './Home.css'
import React, {useEffect} from 'react'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import Portafolio from './Portafolio/Portafolio'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import {createContent} from '../../../services/ApiClient'

function Home(props) {

    const data = {
        content: '',
        url: '/',
        name: 'Inicio'
    }

    const title = props.title || 'Inicio'

    useEffect(() => {
        const mainContent = document.querySelector('main').innerText

        const fetchData = async () => {
            data.content = mainContent
            await createContent(data)
        }
        fetchData()

        document.title = `Grupo Leti | ${title}`

        const isMenuOpen = document.querySelector('.show')

        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
