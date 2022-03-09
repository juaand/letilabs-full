import React from 'react'
import EditCompaniesVideoGenven from './EditCompaniesVideoGenven/EditCompaniesVideoGenven'
import EditProductosGenvenPage from './EditProductosGenvenPage/EditProductosGenvenPage'
import EditEquipoGenvenPage from './EditEquipoGenvenPage/EditEquipoGenvenPage'
import EditBannerOCGenven from './EditBannerOCGenven/EditBannerOCGenven'
import EditTimelineGenven from './EditTimelineGenven/EditTimelineGenven'
import EditSeo from './EditSeo/EditSeo'


function EditOurCompaniesGenven() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Genven</h2>
            <EditBannerOCGenven />
            <EditCompaniesVideoGenven />
            <EditProductosGenvenPage />
            <EditTimelineGenven />
            <EditEquipoGenvenPage />
            <EditSeo />
        </main>
    )
}

export default EditOurCompaniesGenven
