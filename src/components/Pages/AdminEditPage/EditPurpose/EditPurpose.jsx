import React from 'react'
import EditBannerPurpose from './EditBannerPurpose/EditBannerPurpose'
import EditPurposeVideo from './EditPurposeVideo/EditPurposeVideo'
import EditTimeLinePurpose from './EditTimelinePurpose/EditTimelinePurpose'
import EditTitleFarmPurpose from './EditFarmTitle/EditTitleFarmPurpose'


function EditPurpose() {
    return (
        <main>
            <h2 className="EditContent EditContent__title">Editar página propósito y responsabilidad social</h2>
            <EditBannerPurpose />
            <EditPurposeVideo />
            <EditTimeLinePurpose />
            <EditTitleFarmPurpose />
        </main>
    )
}

export default EditPurpose
