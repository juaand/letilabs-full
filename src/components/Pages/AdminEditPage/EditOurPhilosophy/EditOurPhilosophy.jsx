import React from 'react'
import EditInfoCardsOurPhilosophy from './EditInfoCardsOurPhilosophy/EditInfoCardsOurPhilosophy'
import EditBannerOurPhilosophy from './EditBannerOurPhilosophy/EditBannerOurPhilosophy'
import EditBottomOurPhilosophy from './EditBottomOurPhilosophy/EditBottomOurPhilosophy'
import EditLetterOurPhilosophy from './EditLetterOurPhilosophy/EditLetterOurPhilosophy'
import EditSeo from './EditSeo/EditSeo'


function EditOurPhilosophy() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página nuestra filosofia</h2>
            <EditBannerOurPhilosophy />
            <EditInfoCardsOurPhilosophy />
            <EditLetterOurPhilosophy />
            <EditBottomOurPhilosophy />
            <EditSeo />
        </main>
    )
}

export default EditOurPhilosophy
