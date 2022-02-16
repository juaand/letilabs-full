import React from 'react'
import EditInfoCardsOurPeople  from './EditInfoCardsOurPeople/EditInfoCardsOurPeople'
import EditEquipoOurPeople  from './EditEquipoOurPeople/EditEquipoOurPeople'
import EditBannerOurPeople from './EditBannerOurPeople/EditBannerOurPeople'
import EditBottomOurPeople from './EditBottomOurPeople/EditBottomOurPeople'
import EditBannerTeams  from './EditBannerTeams/EditBannerTeams'
import EditCarreras from './EditCarreras/EditCarreras'


function EditOurPeople() {
    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestra gente</h2>
            <EditBannerOurPeople />
            <EditBannerTeams />
            <EditInfoCardsOurPeople />
            <EditCarreras />
            <EditEquipoOurPeople />
            <EditBottomOurPeople />
        </main>
    )
}

export default EditOurPeople
