import React from 'react'
import EditBannerOurPhilosophy from './EditBannerOurPhilosophy/EditBannerOurPhilosophy'
import EditBottomOurPhilosophy from './EditBottomOurPhilosophy/EditBottomOurPhilosophy'
import EditInfoCardsOurPhilosophy from './EditInfoCardsOurPhilosophy/EditInfoCardsOurPhilosophy'
import EditLetterOurPhilosophy from './EditLetterOurPhilosophy/EditLetterOurPhilosophy'


function EditOurPhilosophy() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestra filosofia</h2>
            <EditBannerOurPhilosophy />
            <EditInfoCardsOurPhilosophy />
            <EditLetterOurPhilosophy />
            <EditBottomOurPhilosophy />
        </main>
    )
}

export default EditOurPhilosophy
