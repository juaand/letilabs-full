import React from 'react'
import EditTimeLinePurpose from './EditTimelinePurpose/EditTimelinePurpose'
import EditBannerPurpose from './EditBannerPurpose/EditBannerPurpose'
import EditPurposeVideo from './EditPurposeVideo/EditPurposeVideo'
import EditSeo from './EditSeo/EditSeo'

function EditPurpose() {
    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página propósito y responsabilidad social</h2>
            <EditBannerPurpose />
            <EditPurposeVideo />
            <EditTimeLinePurpose />
            <EditSeo />
        </main>
    )
}

export default EditPurpose
