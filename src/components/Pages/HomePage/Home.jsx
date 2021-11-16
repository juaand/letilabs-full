import './Home.css'
import React, {useEffect, Suspense} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'


function Home() {
    const Video = React.lazy(() => import('./Video/Video'))
    const UsInfo = React.lazy(() => import('./UsInfo/UsInfo'))
    const Carousel = React.lazy(() => import('./Carousel/Carousel'))
    const Unidades = React.lazy(() => import('./Unidades/Unidades'))
    const Portafolio = React.lazy(() => import('./Portafolio/Portafolio'))
    const FarmacoVigilancia = React.lazy(() => import('./FarmacoVigilancia/FarmacoVigilancia'))
    const FindProduct = React.lazy(() => import('./FindProduct/FindProduct'))


    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/',
        name: 'Inicio'
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
            <Seo title='Grupo Leti | Inicio' name='description' content="Laboratorios Leti es un laboratorio farmacéutico venezolano que desde hace 70 años, crea soluciones de salud a través de la producción y comercialización de un amplio portafolio de medicamentos desarrollados con tecnología y seguridad, de la mano de un talento humano caliﬁcado que trabaja día a día para acompañar a los venezolanos." />
            <Suspense fallback={<Loader />}>
                <main>
                    <Video />
                    <UsInfo />
                    <Carousel />
                    <Unidades />
                    <Portafolio />
                    <FindProduct />
                    <FarmacoVigilancia />
                </main>
            </Suspense>
        </>
    )
}

export default Home
