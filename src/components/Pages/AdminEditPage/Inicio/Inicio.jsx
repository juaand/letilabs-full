import React, {Suspense} from 'react'
import Seo from '../../../Seo/Seo'
import Loader from '../../../Loader/Loader'
import Video from '../../HomePage/Video/Video'
import Carousel from '../../HomePage/Carousel/Carousel'
import Unidades from '../../HomePage/Unidades/Unidades'
import Portafolio from '../../HomePage/Portafolio/Portafolio'
import FindProduct from '../../HomePage/FindProduct/FindProduct'
import FarmacoVigilancia from '../../HomePage/FarmacoVigilancia/FarmacoVigilancia'
import UsInfo from '../Inicio/UsInfo/UsInfo'

function Inicio() {

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

export default Inicio
