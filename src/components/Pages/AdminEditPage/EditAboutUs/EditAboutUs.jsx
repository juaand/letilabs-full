import React from 'react'
import EditBanner from './EditBanner/EditBanner'
import EditMarcandoPauta from './EditMarcandoPauta/EditMarcandoPauta'
import EditTimeline from './EditTimeline/EditTimeline'
import EditGallery from './EditGallery/EditGallery'
import EditMegat from './EditMegat/EditMegat'

function EditAboutUs() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página sobre nosotros</h2>
            <EditBanner />
            <EditMarcandoPauta />
            <EditTimeline />
            <EditGallery />
            <EditMegat />
        </main>
    )
}

export default EditAboutUs