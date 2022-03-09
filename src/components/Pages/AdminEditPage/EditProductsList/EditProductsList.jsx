import React from 'react'
import EditProductListBanner from './EditProductListBanner/EditProductListBanner'
import EditSeo from './EditSeo/EditSeo'

function EditProductsList() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página listado de productos</h2>
            <EditProductListBanner />
            <EditSeo />
        </main>
    )
}

export default EditProductsList
