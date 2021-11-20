import React from 'react'

function EditBottomCta() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Banner botones</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de banner botones
            </form>
        </section>
    )
}

export default EditBottomCta
