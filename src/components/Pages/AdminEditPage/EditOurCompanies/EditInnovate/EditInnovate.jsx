import React from 'react'

function EditInnovate() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Innovar</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de innovar
            </form>
        </section>
    )
}

export default EditInnovate
