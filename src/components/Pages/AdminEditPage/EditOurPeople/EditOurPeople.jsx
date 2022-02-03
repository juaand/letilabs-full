import React from 'react'
import EditBannerOurPeople from './EditBannerOurPeople/EditBannerOurPeople'
import EditBottomOurPeople from './EditBottomOurPeople/EditBottomOurPeople'
import EditCarreras from './EditCarreras/EditCarreras'
import EditEquipoOurPeople  from './EditEquipoOurPeople/EditEquipoOurPeople'
import EditInfoCardsOurPeople  from './EditInfoCardsOurPeople/EditInfoCardsOurPeople'


function EditOurPeople() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestra gente</h2>
            <EditBannerOurPeople />
            <EditInfoCardsOurPeople />
            <EditCarreras />
            <EditEquipoOurPeople />
            <EditBottomOurPeople />
        </main>
    )
}

export default EditOurPeople
