import React from 'react'
import EditInfoCardsID from './EditInfoCardsID/EditInfoCardsID'
import EditGoalsInfo from './EditGoalsInfo/EditGoalsInfo'
import EditBannerID from './EditBannerIAD/EditBannerIAD'
import EditBottomID from './EditBottomID/EditBottomID'
import EditSeo from './EditSeo/EditSeo'

function EditIAndD() {
    return (
        <div>
            <h2 className="EditContent EditContent__title">Editar Investigación y Desarrollo</h2>
            <EditBannerID />
            <EditInfoCardsID />
            <EditGoalsInfo />
            <EditBottomID />
            <EditSeo />
        </div>
    )
}

export default EditIAndD
