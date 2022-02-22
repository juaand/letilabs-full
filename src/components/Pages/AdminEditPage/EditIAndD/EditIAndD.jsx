import React from 'react'
import EditBannerID from './EditBannerIAD/EditBannerIAD'
import EditBottomID from './EditBottomID/EditBottomID'
import EditGoalsInfo from './EditGoalsInfo/EditGoalsInfo'
import EditInfoCardsID from './EditInfoCardsID/EditInfoCardsID'

function EditIAndD() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo</h2>
            <EditBannerID />
            <EditInfoCardsID />
            <EditGoalsInfo />
            <EditBottomID />
        </div>
    )
}

export default EditIAndD
