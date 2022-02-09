import React from 'react'
import EditBannerProducts from './EditBannerProducts/EditBannerProducts'
import EditProductBottom from './EditProductBottom/EditProductBottom'
import EditProductListBanner from './EditProductListBanner/EditProductListBanner'

function EditProducts() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página productos</h2>
            <EditBannerProducts />
            <EditProductListBanner />
            <EditProductBottom />
        </main>
    )
}

export default EditProducts
