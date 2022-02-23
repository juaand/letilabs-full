import React from 'react'
import EditFarmacoVigilanciaModal from './EditFarmacoVigilanciaModal/EditFarmacoVigilanciaModal'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditCarousel from './EditCarousel/EditCarousel'
import EditUnidades from './EditUnidades/EditUnidades'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'

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
            <EditFarmacoVigilanciaModal />
        </main>
        
    )
}

export default EditHome
