import React from 'react'
import EditBannerOCGenven from './EditBannerOCGenven/EditBannerOCGenven'
import EditCompaniesVideoGenven from './EditCompaniesVideoGenven/EditCompaniesVideoGenven'
import EditEquipoGenvenPage from './EditEquipoGenvenPage/EditEquipoGenvenPage'
import EditProductosGenvenPage from './EditProductosGenvenPage/EditProductosGenvenPage'
import EditTimelineGenven from './EditTimeline/EditTimeline'


function EditOurCompaniesGenven() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas Genven</h2>
            <EditBannerOCGenven />
            <EditCompaniesVideoGenven />
            <EditProductosGenvenPage />
            <EditTimelineGenven />
            <EditEquipoGenvenPage />
        </main>
    )
}

export default EditOurCompaniesGenven
