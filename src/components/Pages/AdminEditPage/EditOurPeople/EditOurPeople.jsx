import React from 'react'
import EditInfoCardsOurPeople from './EditInfoCardsOurPeople/EditInfoCardsOurPeople'
import EditEquipoOurPeople from './EditEquipoOurPeople/EditEquipoOurPeople'
import EditBannerOurPeople from './EditBannerOurPeople/EditBannerOurPeople'
import EditBottomOurPeople from './EditBottomOurPeople/EditBottomOurPeople'
import EditBannerTeams from './EditBannerTeams/EditBannerTeams'
import EditCarreras from './EditCarreras/EditCarreras'
import EditSeo from './EditSeo/EditSeo'

function EditOurPeople() {
    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página gente LETI</h2>
            <EditBannerOurPeople />
            <EditBannerTeams />
            <EditInfoCardsOurPeople />
            <EditCarreras />
            <EditEquipoOurPeople />
            <EditBottomOurPeople />
            <EditSeo />
        </main>
    )
}

export default EditOurPeople
