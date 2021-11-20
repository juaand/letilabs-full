import React from 'react'

function EditMegat() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Megat</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de megat
            </form>
        </section>
    )
}

export default EditMegat
