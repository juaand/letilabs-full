import './AboutUs.css'
import React, {useEffect, Suspense} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Loader from '../../Loader/Loader'

function AboutUs() {
    const Banner = React.lazy(() => import('./Banner/Banner'))
    const MarcandoPauta = React.lazy(() => import('./MarcandoPauta/MarcandoPauta'))
    const Timeline = React.lazy(() => import('./Timeline/Timeline'))
    const Megat = React.lazy(() => import('./Megat/Megat'))
    const Gallery = React.lazy(() => import('./Gallery/Gallery'))



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
            <Seo title='Grupo Leti | Sobre nosotros' name='description' content='Esta página fue realizada por Andrés Martínez y Juan Romero' />
            <Suspense fallback={<Loader />}>
                <main>
                    <Banner />
                    <MarcandoPauta />
                    <Timeline />
                    <Gallery />
                    <Megat />
                </main>
            </Suspense>
        </>
    )
}

export default AboutUs
