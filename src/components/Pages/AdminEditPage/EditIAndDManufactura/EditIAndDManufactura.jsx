import React from 'react'
import EditCertificatesManufacture from './EditCertificatesManufacture/EditCertificatesManufacture'
import EditBannerManufacture from './EditBannerManufacture/EditBannerManufacture'
import EditBottomManufacture from './EditBottomManufacture/EditBottomManufacture'
import EditCarouselManufacture from './EditCarouselManufacture/EditCarouselManufacture'
import EditSeo from './EditSeo/EditSeo'

function EditIAndDManufactura() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo Manufactura</h2>
            <EditBannerManufacture />
            <EditCarouselManufacture />
            <EditCertificatesManufacture />
            <EditBottomManufacture />
            <EditSeo />
        </div>
    )
}

export default EditIAndDManufactura
