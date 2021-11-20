import React from 'react'
import EditBanner from './EditBanner/EditBanner'
import EditCompaniesInfo from './EditCompaniesInfo/EditCompaniesInfo'
import EditProdutcsBanner from './EditProdutcsBanner/EditProdutcsBanner'
import EditInnovate from './EditInnovate/EditInnovate'
import EditCare from './EditCare/EditCare'
import EditBottomCta from './EditBottomCta/EditBottomCta'

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
        </main>
    )
}

export default EditOurCompanies
