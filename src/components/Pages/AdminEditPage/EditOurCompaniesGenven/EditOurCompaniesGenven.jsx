import React from 'react'
import EditBannerOCGenven from './EditBannerOCGenven/EditBannerOCGenven'
import EditCompaniesInfoCardsGenven from './EditCompaniesInfoCardsGenven/EditCompaniesInfoCardsGenven'
import EditProdutcsBanner from './EditEquipoGenvenPage/EditEquipoGenvenPage'
import EditTimelineGenven from './EditTimeline/EditTimeline'


function EditOurCompaniesGenven() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Genven</h2>
            <EditBannerOCGenven />
            <EditCompaniesInfoCardsGenven />
            <EditTimelineGenven />
            <EditProdutcsBanner />
        </main>
    )
}

export default EditOurCompaniesGenven
