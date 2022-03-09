import React from 'react'
import EditProdutcsBanner from './EditProdutcsBanner/EditProdutcsBanner'
import EditCompaniesInfo from './EditCompaniesInfo/EditCompaniesInfo'
import EditBottomCta from './EditBottomCta/EditBottomCta'
import EditInnovate from './EditInnovate/EditInnovate'
import EditBanner from './EditBanner/EditBanner'
import EditCare from './EditCare/EditCare'
import EditSeo from './EditSeo/EditSeo'

function EditOurCompanies() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestras empresas</h2>
            <EditBanner />
            <EditCompaniesInfo />
            <EditProdutcsBanner />
            <EditInnovate />
            <EditCare />
            <EditBottomCta />
            <EditSeo />
        </main>
    )
}

export default EditOurCompanies
