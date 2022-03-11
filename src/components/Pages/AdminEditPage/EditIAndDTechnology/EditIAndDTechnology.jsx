import React from 'react'
import EditCarrouselTech from './EditCarrouselTech/EditCarrouselTech'
import EditBannerTech from './EditBannerTech/EditBannerTech'
import EditBottomTech from './EditBottomTech/EditBottomTech'
import EditVideoTech from './EditVideoTech/EditVideoTech'
import EditMapTech from './EditMapTech/EditMapTech'
import EditSeo from './EditSeo/EditSeo'

function EditIAndDTechnology() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo Tecnología</h2>
            <EditBannerTech />
            <EditVideoTech />
            <EditCarrouselTech />
            <EditMapTech />
            <EditBottomTech />
            <EditSeo />
        </div>
    )
}

export default EditIAndDTechnology
