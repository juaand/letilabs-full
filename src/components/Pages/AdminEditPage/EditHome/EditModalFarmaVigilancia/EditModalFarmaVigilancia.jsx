import React from 'react'

function EditFarmacoVigilancia() {

    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Farmaco vigilancia</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de farmaco vigilancia
            </form>
        </section>
    )
}

export default EditFarmacoVigilancia
