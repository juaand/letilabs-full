import React from 'react'
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
                <main>
                    <Video />
                    <UsInfo />
                    <Carousel />
                    <Unidades />
                    <Portafolio />
                    <FindProduct />
                    <FarmacoVigilancia />
                </main>
        </>
    )
}

export default Inicio
