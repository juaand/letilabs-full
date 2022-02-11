import React, {useState, useEffect} from 'react'
import './EditNewsTags.css'
import {useFormState} from '../../../../../hooks/useFormState'
import {getTags, deleteTag, createTag} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'

function EditNewsTags() {

    const [tagsData, setTagsData] = useState([])

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                newTag: '',
            },
            error: {
                newTag: false,
            },
            touch: {},
        },
        {
            newTag: v => v.length,
        }
    )

    const {data, error, touch} = state


    const createNewTag = async (e) => {
        e.preventDefault()

        const tag = await createTag(data?.newTag)
        setTagsData(tag)
        data.newTag = ''
    }


    const deleteSelectedTag = async (id) => {
        const result = await deleteTag(id)
        setTagsData(result)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTagsData = await getTags()
            setTagsData(getTagsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container-fluid EditContent EditNewsTags">
                <h2>Crear nuevas etiquetas</h2>
                <form className="AdminEdit__form" onSubmit={createNewTag}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Nueva etiqueta
                            </p>
                            <InputWithLabel
                                value={data?.newTag}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="newTag"
                                type="text"
                                cssStyle={`form-control ${touch.newTag && error.newTag ? "is-invalid" : ""}`}
                                placeholder="Ingresa nueva etiqueta"
                            />
                        </div>
                        <div className="col-6">
                            <Button cssStyle="leti-btn hidden-label AdminEdit__form-leti-btn" >Añadir nueva etiqueta</Button>
                        </div>
                    </div>
                </form>
            </section>
            <section className="container-fluid EditContent EditNewsTags-delete">
                <h2>Eliminar etiquetas</h2>
                <div className="row">
                    {tagsData?.map(el =>
                        <div onClick={() => deleteSelectedTag(el?.id)} className="col-sm-2 col-4 EditNewsTags-delete-tags">{el?.tag}</div>
                    )}
                </div>
            </section>
        </>
    )
}

export default EditNewsTags
