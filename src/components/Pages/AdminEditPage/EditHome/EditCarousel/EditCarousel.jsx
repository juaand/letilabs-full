import React from 'react'

function EditCarousel() {

    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Carrusel</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de carrusel de productos
            </form>
        </section>
    )
}

export default EditCarousel
