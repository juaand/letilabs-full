import React from 'react'
import EditBannerID from './EditBannerIAD/EditBannerIAD'
import EditBottomID from './EditBottomID/EditBottomID'
import EditGoalsInfo from './EditGoalsInfo/EditGoalsInfo'
import EditInfoCardsID from './EditInfoCardsID/EditInfoCardsID'

function EditIAndD() {
    return (
        <div>
            <h1>Editar Investigación y Desarrollo</h1>
            <EditBannerID />
            <EditGoalsInfo />
            <EditInfoCardsID />
            <EditBottomID />
        </div>
    )
}

export default EditIAndD
