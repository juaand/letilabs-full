import React from 'react'

function EditTimeline() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Carrusel</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de carrusel
            </form>
        </section>
    )
}

export default EditTimeline
