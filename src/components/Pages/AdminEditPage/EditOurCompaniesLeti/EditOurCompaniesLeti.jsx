import React from 'react'
import EditCompaniesInfoCardsLeti from './EditCompaniesInfoCardsLeti/EditCompaniesInfoCardsLeti'
import EditProdutcsBanner from './EditEquipoLetiPage/EditEquipoLetiPage'
import EditBannerOCLeti from './EditBannerOCLeti/EditBannerOCLeti'
import EditTimelineLeti from './EditTimeline/EditTimeline'
import EditSeo from './EditSeo/EditSeo'


function EditOurCompaniesLeti() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Leti</h2>
            <EditBannerOCLeti />
            <EditCompaniesInfoCardsLeti />
            <EditTimelineLeti />
            <EditProdutcsBanner />
            <EditSeo />
        </main>
    )
}

export default EditOurCompaniesLeti
