import React from 'react'
import EditFarmacoVigilanciaModal from './EditFarmacoVigilanciaModal/EditFarmacoVigilanciaModal'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditCarousel from './EditCarousel/EditCarousel'
import EditUnidades from './EditUnidades/EditUnidades'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'
import EditBottomCTA from './EditBottomCTA/EditBottomCTA'
import EditCookies from './EditCookies/EditCookies'
import EditRrss from './EditRrss/EditRrss'

function EditHome() {

    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página Inicio</h2>
            <EditVideo />
            <EditUsInfo />
            <EditCarousel />
            <EditUnidades />
            <EditPortafolio />
            <EditBottomCTA />
            <EditFarmacoVigilancia />
            <EditFarmacoVigilanciaModal />
            <EditCookies />
            <EditRrss />
        </main>

    )
}

export default EditHome
