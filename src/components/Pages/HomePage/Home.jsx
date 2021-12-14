import './Home.css'
import React, {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'
import Unidades from './Unidades/Unidades'
import Portafolio from './Portafolio/Portafolio'
import FindProduct from './FindProduct/FindProduct'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import CookieConsent from "react-cookie-consent"


function Home() {

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
            <Helmet>
                <title>Grupo Leti | Inicio</title>
                <meta name="description" content="Laboratorios Leti es un laboratorio farmacéutico venezolano que desde hace 70 años, crea soluciones de salud a través de la producción y comercialización de un amplio portafolio de medicamentos desarrollados con tecnología y seguridad, de la mano de un talento humano caliﬁcado que trabaja día a día para acompañar a los venezolanos." />
                <meta name="keywords" content="Grupo Leti, Inicio" />
            </Helmet>
            <main>
                <Video />
                <UsInfo />
                <Carousel />
                <Unidades />
                <Portafolio />
                <FindProduct />
                <FarmacoVigilancia />
            </main>
            <CookieConsent
                location="bottom"
                buttonText="Aceptar"
                cookieName="cookieConsentimiento"
                style={{fontSize: "14px", color: "#fff"}}
                expires={150}
            >
                <div className="container Cookies__container">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h1>Política de cookies</h1>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p>
                                Utilizamos cookies para poder ofrecerle la mejor experiencia posible en el sitio web. Esto incluye las cookies que son necesarias para el funcionamiento del sitio web, así como otras cookies que se utilizan únicamente con fines estadísticos anónimos. {" "}</p>
                        </div>
                    </div>
                </div>
            </CookieConsent>
        </>
    )
}

export default Home
