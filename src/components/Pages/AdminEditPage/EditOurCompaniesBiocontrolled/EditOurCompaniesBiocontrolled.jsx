import React from 'react'
import EditBannerOCBiocontrolled from './EditBannerOCBiocontrolled/EditBannerOCBiocontrolled'
import EditCarrouselBiocontrolled from './EditCarrousel/EditCarrousel'
import EditCompaniesInfoCardsBiocontrolled from './EditCompaniesInfoCardsBiocontrolled/EditCompaniesInfoCardsBiocontrolled'
import EditEquipoBiocontrolledPage from './EditEquipoBiocontrolledPage/EditEquipoBiocontrolledPage'
import EditTimelineBiocontrolled from './EditTimeline/EditTimeline'


function EditOurCompaniesBiocontrolled() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Biocontrolled</h2>
            <EditBannerOCBiocontrolled />
            <EditCompaniesInfoCardsBiocontrolled />
            <EditCarrouselBiocontrolled />
            <EditTimelineBiocontrolled />
            <EditEquipoBiocontrolledPage />
        </main>
    )
}

export default EditOurCompaniesBiocontrolled
