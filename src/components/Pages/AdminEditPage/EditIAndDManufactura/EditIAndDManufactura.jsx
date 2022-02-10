import React from 'react'
import EditBannerManufacture from './EditBannerManufacture/EditBannerManufacture'
import EditBottomManufacture from './EditBottomManufacture/EditBottomManufacture'
import EditCarouselManufacture from './EditCarouselManufacture/EditCarouselManufacture'
import EditCertificatesManufacture from './EditCertificatesManufacture/EditCertificatesManufacture'

function EditIAndDManufactura() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo Manufactura</h2>
            <EditBannerManufacture />
            <EditCarouselManufacture />
            <EditCertificatesManufacture />
            <EditBottomManufacture />
        </div>
    )
}

export default EditIAndDManufactura
