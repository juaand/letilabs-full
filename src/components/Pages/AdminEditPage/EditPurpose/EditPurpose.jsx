import React from 'react'
import EditTimeLinePurpose from './EditTimelinePurpose/EditTimelinePurpose'
import EditBannerPurpose from './EditBannerPurpose/EditBannerPurpose'
import EditPurposeVideo from './EditPurposeVideo/EditPurposeVideo'

function EditPurpose() {
    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página propósito y responsabilidad social</h2>
            <EditBannerPurpose />
            <EditPurposeVideo />
            <EditTimeLinePurpose />
        </main>
    )
}

export default EditPurpose
