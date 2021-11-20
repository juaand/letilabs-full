import React from 'react'
import EditUsInfo from './EditUsInfo/EditUsInfo'
import EditVideo from './EditVideo/EditVideo'
import EditCarousel from './EditCarousel/EditCarousel'
import EditUnidades from './EditUnidades/EditUnidades'
import EditPortafolio from './EditPortafolio/EditPortafolio'
import EditFindProduct from './EditFindProduct/EditFindProduct'
import EditFarmacoVigilancia from './EditFarmacoVigilancia/EditFarmacoVigilancia'

function EditInicio() {

    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página Inicio</h2>
            <EditVideo />
            <EditUsInfo />
            <EditCarousel />
            <EditUnidades />
            <EditPortafolio />
            <EditFindProduct />
            <EditFarmacoVigilancia />
        </main>
    )
}

export default EditInicio
