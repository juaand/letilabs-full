import React from 'react'
import EditCarrouselAlliances from './EditCarrouselAlliances/EditCarrouselAlliances'
import EditBannerAlliances from './EditBannerAlliances/EditBannerAlliances'
import EditBottomAlliances from './EditBottomAlliances/EditBottomAlliances'
import EditFormAlliances from './FormAlliances/FormAlliances'
import EditSeo from './EditSeo/EditSeo'

function EditIAndDAlliances() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo Alianzas</h2>
            <EditBannerAlliances />
            <EditCarrouselAlliances />
            <EditFormAlliances />
            <EditBottomAlliances />
            <EditSeo />
        </div>
    )
}

export default EditIAndDAlliances
