import './Home.css'
import React, {useEffect} from 'react'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import Portafolio from './Portafolio/Portafolio'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import {createContent} from '../../../services/ApiClient'
import { useAuthContext } from '../../../contexts/AuthContext'
import FindProduct from './FindProduct/FindProduct'

function Home(props) {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/',
        name: 'Inicio'
    }

    const title = props.title || 'Inicio'

    useEffect(() => {
        if(user) {
        const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
        mainContent.forEach(content => {
            data.content.push(content.innerHTML)
        })

        const fetchData = async () => {
            await createContent(data)
          }
          fetchData()
        }
         

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
            <FindProduct />
            <FarmacoVigilancia />
        </main>
    )
}

export default Home
