import React from 'react'
import EditNewsTitles from './EditNewsTitles/EditNewsTitles'
import EditSeo from './EditSeo/EditSeo'

function EditNoticias() {
    return (

        <main>
            <h2 className="EditContent EditContent__title">Editar página noticias</h2>
            <EditNewsTitles />
            <EditSeo />
        </main>
    )
}

export default EditNoticias
