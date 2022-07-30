import React from 'react'
import EditMarcandoPauta from './EditMarcandoPauta/EditMarcandoPauta'
import EditTimeline from './EditTimeline/EditTimeline'
import EditGallery from './EditGallery/EditGallery'
import EditBanner from './EditBanner/EditBanner'
import EditMegat from './EditMegat/EditMegat'
import EditSeo from './EditSeo/EditSeo'

function EditAboutUs() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página somos leti</h2>
            <EditBanner />
            <EditMarcandoPauta />
            <EditTimeline />
            <EditGallery />
            <EditMegat />
            <EditSeo />
        </main>
    )
}

export default EditAboutUs