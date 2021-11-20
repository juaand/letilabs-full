import React from 'react'

function EditGallery() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Galería</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de galería
            </form>
        </section>
    )
}

export default EditGallery
