import React from 'react'
import EditBannerTech from './EditBannerTech/EditBannerTech'
import EditBottomTech from './EditBottomTech/EditBottomTech'
import EditCarrouselTech from './EditCarrouselTech/EditCarrouselTech'
import EditMapTech from './EditMapTech/EditMapTech'
import EditVideoTech from './EditVideoTech/EditVideoTech'

function EditIAndDTechnology() {
    return (
        <div>
            <h1>Editar Investigación y Desarrollo Tecnologia</h1>
            <EditBannerTech />
            <EditCarrouselTech />
            <EditVideoTech />
            <EditMapTech />
            <EditBottomTech />
        </div>
    )
}

export default EditIAndDTechnology
