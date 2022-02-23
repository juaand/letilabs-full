import React from 'react'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'
import EditCarousel from './EditCarousel/EditCarousel'
import EditUnidades from './EditUnidades/EditUnidades'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'

function EditHome() {

    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página Inicio</h2>
            <EditVideo />
            <EditUsInfo />
            <EditCarousel />
            <EditUnidades />
            <EditPortafolio />
            <EditFarmacoVigilancia />
        </main>
        
    )
}

export default EditHome
