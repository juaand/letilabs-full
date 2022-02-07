import React from 'react'
import EditBannerAlliances from './EditBannerAlliances/EditBannerAlliances'
import EditCarrouselAlliances from './EditCarrouselAlliances/EditCarrouselAlliances'
import EditBottomAlliances from './EditBottomAlliances/EditBottomAlliances'
import EditFormAlliances from './FormAlliances/FormAlliances'

function EditIAndDAlliances() {
    return (
        <div>
            <h1>Editar Investigación y Desarrollo Alianzas</h1>
            <EditBannerAlliances />
            <EditCarrouselAlliances />
            <EditFormAlliances />
            <EditBottomAlliances />
        </div>
    )
}

export default EditIAndDAlliances
