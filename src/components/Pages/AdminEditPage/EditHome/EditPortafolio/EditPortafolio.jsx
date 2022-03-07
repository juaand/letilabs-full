import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getPortfolio, createPortfolio, updateTitlePortfolio} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'


function EditPortafolio() {

    const [newItemMessage, setNewItemMessage] = useState([])
    const [portfolioData, setPortfolioData] = useState([])
    const [modalData, setModalData] = useState([])

    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')

    const [bool, setBool] = useState(false)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                superiorTitle: portfolioData?.superiorTitle,
                title: portfolioData?.title,
                description: portfolioData?.description,
            },
            error: {
                superiorTitle: true,
                title: true,
                description: true,
            },
            touch: {},
        },
        {
            superiorTitle: v => v.length,
            title: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const createPortfolioItem = async (event) => {
        event.preventDefault()
        data.superiorTitle = title

        if (error.title === false && error.description === false) {
            if (data.title === '' || data.description === '') {
                setNewItemMessage('Por favor complete todos los campos')
            } else {
                try {
                    await createPortfolio(data)
                        .then(portfolio => {
                            setPortfolioData(portfolio)
                            setNewItemMessage('Elemento añadido exitosamente')
                        })
                        .catch(error => {
                            setRegisterError(error)
                        })
                } catch (err) {
                    setRegisterError(err.response?.data?.message)
                }
            }
        } else {
            setNewItemMessage('Por favor rellene ambos campos')
        }
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.superiorTitle === false) {
            try {
                await updateTitlePortfolio(data)
                    .then(info => {
                        setPortfolioData(info)
                        setMessage('Título atualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el título')
        }
    }

    const handlePortfolioDescription = (e) => {
        data.description = e.target.getContent()
        error.description = false
    }

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setPortfolioData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getPortfolioData = await getPortfolio()
            setPortfolioData(getPortfolioData)
            setTitle(getPortfolioData[0]?.superiorTitle)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            <section className="container-fluid Letilabs EditContent EditContent-timeline">
                <h2>Editar portafolio</h2>
                <div className="row justify-content-around">
                    {portfolioData?.map(el =>
                        <div className="col-sm-3 col-12 EditCarousel__edit EditCarousel__edit-force" onClick={() => showModal(el)}>
                            <h4 className="mt-3 mb-3">{el?.title}</h4>
                            <p dangerouslySetInnerHTML={{__html: el?.description}} />
                        </div>
                    )}
                </div>
            </section>
            <section className="container-fluid EditContent">
                <h2>Añadir portafolio</h2>
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                    <div className="row">
                        <h3>Editar título portafolio</h3>
                        <div className="col-12">
                            <InputWithLabel
                                value={data.superiorTitle}
                                label="Título carrusel"
                                onChange={onChange}
                                name="superiorTitle"
                                type="text"
                                cssStyle="form-control mb-5"
                                placeholder={title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                            {message && <span className="AdminEdit__message ">{message}</span>}
                        </div>
                    </div>
                    <hr className="mt-5 mb-5" />
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
                <form className="AdminEdit__form" onSubmit={createPortfolioItem}>
                    <div className="row">
                        <h3>Añadir elemento nuevo al portafolio</h3>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <InputWithLabel
                                value={data?.title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle="form-control"
                                placeholder={portfolioData?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={portfolioData?.description}
                                onChange={handlePortfolioDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 140,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'bold',
                                }}
                            /></div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo elemento</Button>
                            {newItemMessage && <span className="AdminEdit__message ">{newItemMessage}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditPortafolio
