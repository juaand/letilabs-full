import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getPortfolio, updatePortfolioData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'


function EditPortafolio() {

    const [portfolioData, setPortfolioData] = useState()
    const [modalData, setModalData] = useState()
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
                superiorTitle: false,
                title: false,
                description: false,
            },
            touch: {},
        },
        {
            superiorTitle: v => v.length,
            title: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updatePortfolioInfo = async (event) => {
        event.preventDefault()
        data.id = portfolioData._id

        try {
            await updatePortfolioData(data)
                .then(portfolio => {
                    setPortfolioData(portfolio[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handlePortfolioDescription = (e) => {
        data.description = e.target.getContent()
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
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
        <section className="container-fluid EditContent">
            <h2>Editar Portfolio</h2>
            <div className="row justify-content-around">
                {portfolioData?.map(el =>
                    <div className="col-2 EditUnidades__trash" onClick={() => showModal(el)}>
                        <h4 className="mt-3 mb-3">{el?.title}</h4>
                        <p>{el?.description}</p>                    
                    </div>
                )}
            </div>
        </section>
        <section className="container-fluid EditContent">
            <h2>Añadir Portafolio</h2>
            <form className="AdminEdit__form" onSubmit={updatePortfolioInfo}>
                <div className="row">
                <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            título sección
                        </p>
                        <InputWithLabel
                            value={data?.superiorTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="superiorTitle"
                            type="text"
                            cssStyle={`form-control ${touch.superiorTitle && error.superiorTitle ? "is-invalid" : ""}`}
                            placeholder={portfolioData?.superiorTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            titulo
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                            placeholder={portfolioData?.title}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            description
                        </p>
                        <Editor
                            initialValue={portfolioData?.description}
                            onChange={handlePortfolioDescription}
                            apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                            init={{
                                height: 200,
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
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Editar Portfolio</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
        </>
    )
}

export default EditPortafolio
