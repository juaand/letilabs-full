import React from 'react'
import EditFarmacoVigilanciaModal from './EditFarmacoVigilanciaModal/EditFarmacoVigilanciaModal'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditBottomCTA from './EditBottomCTA/EditBottomCTA'
import EditUnidades from './EditUnidades/EditUnidades'
import EditCarousel from './EditCarousel/EditCarousel'
import EditCookies from './EditCookies/EditCookies'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'
import EditRrss from './EditRrss/EditRrss'
import EditSeo from './EditSeo/EditSeo'

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
            <EditSeo />
        </main>

    )
}

export default EditHome
