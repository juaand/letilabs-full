import React from 'react'
import EditBannerProducts from './EditBannerProducts/EditBannerProducts'
import EditProductBottom from './EditProductBottom/EditProductBottom'
import EditSeo from './EditSeo/EditSeo'

function EditProducts() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página productos</h2>
            <EditBannerProducts />
            <EditProductBottom />
            <EditSeo />
        </main>
    )
}

export default EditProducts
