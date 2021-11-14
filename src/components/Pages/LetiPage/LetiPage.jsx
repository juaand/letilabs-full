import './LetiPage.css'
import React, {useEffect} from 'react'
import {createContent} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import Seo from '../../Seo/Seo'
import Banner from './Banner/Banner'


function LetiPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/leti',
        name: 'Leti'
    }

    useEffect(() => {
        if (user) {
            const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
            mainContent.forEach(content => {
                data.content.push(content.innerHTML)
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
            <Seo title='Grupo Leti | Leti' name='description' content="Esta es la unidad que se encarga de desarrollar la gama de productos que abarca diferentes áreas terapéuticas: cardiovascular, metabolismo, gástrica, respiratoria, neurológicas, músculo-esqueléticas, dolor, antibióticos, vitaminas, tanto para el paciente pediátrico como para el paciente adulto." />
            <main>
                <Banner />
            </main>
        </>
    )
}

export default LetiPage
