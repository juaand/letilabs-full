import React from 'react'

function EditUnidades() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Unidades de negocio</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de unidades de negocio
            </form>
        </section>
    )
}

export default EditUnidades
