import React from 'react'

function EditBanner() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Banner</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de banner
            </form>
        </section>
    )
}

export default EditBanner
