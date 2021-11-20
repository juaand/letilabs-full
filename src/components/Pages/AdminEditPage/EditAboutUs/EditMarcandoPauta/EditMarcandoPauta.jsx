import React from 'react'

function EditMarcandoPauta() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Marcando pauta</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de marcando pauta
            </form>
        </section>
    )
}

export default EditMarcandoPauta
