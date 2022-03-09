import React from 'react'
import EditBannerTA from './EditBannerTA/EditBannerTA'
import EditBottomTA from './EditBottomTA/EditBottomTA'
import EditCarrouselTA from './EditCarrouselTA/EditCarrouselTA'
import EditSeo from './EditSeo/EditSeo'


function EditTherapeuticalAreas() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página Áreas Terapéuticas</h2>
            <EditBannerTA />
            <EditCarrouselTA />
            <EditBottomTA />
            <EditSeo />
        </main>
    )
}

export default EditTherapeuticalAreas
