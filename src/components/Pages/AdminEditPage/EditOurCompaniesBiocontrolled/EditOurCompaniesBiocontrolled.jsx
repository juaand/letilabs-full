import React from 'react'
import EditBannerOCBiocontrolled from './EditBannerOCBiocontrolled/EditBannerOCBiocontrolled'
import EditEquipoBiocontrolledPage from './EditEquipoBiocontrolledPage/EditEquipoBiocontrolledPage'
import EditCompaniesInfoCardsBiocontrolled from './EditCompaniesInfoCardsBiocontrolled/EditCompaniesInfoCardsBiocontrolled'
import EditCarrouselBiocontrolled from './EditCarrousel/EditCarrousel'
import EditTimelineBiocontrolled from './EditTimeline/EditTimeline'
import EditSeo from './EditSeo/EditSeo'


function EditOurCompaniesBiocontrolled() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Biocontrolled</h2>
            <EditBannerOCBiocontrolled />
            <EditCompaniesInfoCardsBiocontrolled />
            <EditCarrouselBiocontrolled />
            <EditTimelineBiocontrolled />
            <EditEquipoBiocontrolledPage />
            <EditSeo />
        </main>
    )
}

export default EditOurCompaniesBiocontrolled
