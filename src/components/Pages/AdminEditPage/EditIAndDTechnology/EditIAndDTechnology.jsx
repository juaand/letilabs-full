import React from 'react'
import EditBannerTech from './EditBannerTech/EditBannerTech'
import EditBottomTech from './EditBottomTech/EditBottomTech'
import EditCarrouselTech from './EditCarrouselTech/EditCarrouselTech'
import EditMapTech from './EditMapTech/EditMapTech'
import EditVideoTech from './EditVideoTech/EditVideoTech'

function EditIAndDTechnology() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo Tecnologia</h2>
            <EditBannerTech />
            <EditCarrouselTech />
            <EditVideoTech />
            <EditMapTech />
            <EditBottomTech />
        </div>
    )
}

export default EditIAndDTechnology
