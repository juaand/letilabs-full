import React from 'react'
import EditBannerOCLeti from './EditBannerOCLeti/EditBannerOCLeti'
import EditCompaniesInfoCardsLeti from './EditCompaniesInfoCardsLeti/EditCompaniesInfoCardsLeti'
import EditProdutcsBanner from './EditEquipoLetiPage/EditEquipoLetiPage'
import EditTimelineLeti from './EditTimeline/EditTimeline'


function EditOurCompaniesLeti() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas</h2>
            <EditBannerOCLeti />
            <EditCompaniesInfoCardsLeti />
            <EditTimelineLeti />
            <EditProdutcsBanner />
        </main>
    )
}

export default EditOurCompaniesLeti
