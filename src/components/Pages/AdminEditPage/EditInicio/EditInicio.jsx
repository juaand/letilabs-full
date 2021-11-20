import './EditInicio.css'
import React from 'react'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'
import EditCarousel from './EditCarousel/EditCarousel'
import EditUnidades from './EditUnidades/EditUnidades'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditFindProduct from './EditFindProduct/EditFindProduct'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'

function Inicio() {

    return (
        <>
            <main>
                <EditVideo/>
                <EditUsInfo />
                <EditCarousel />
                <EditUnidades />
                <EditPortafolio />
                <EditFindProduct />
                <EditFarmacoVigilancia />
            </main>
        </>
    )
}

export default Inicio
