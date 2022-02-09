import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getNewsTitles, updateNewsTitles} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'

function EditNewsTitles() {

    const [bannerData, setBannerData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                lastestTitle: bannerData?.lastestTitle,
                mostTitle: bannerData?.mostTitle,
                searchTitle: bannerData?.searchTitle,
                picPath: bannerData?.picPath,
            },
            error: {
                lastestTitle: false,
                mostTitle: false,
                searchTitle: false,
                picPath: false,
            },
            touch: {},
        },
        {
            lastestTitle: v => v.length,
            mostTitle: v => v.length,
            searchTitle: v => v.length,
            picPath: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateNewsTitles(data)
                .then(banner => {
                    setBannerData(banner[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getNewsTitles()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Títulos Noticias Page</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            lastestTitle
                        </p>
                        <InputWithLabel
                            value={data?.lastestTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="lastestTitle"
                            type="text"
                            cssStyle={`form-control ${touch.lastestTitle && error.lastestTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.lastestTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            mostTitle
                        </p>
                        <InputWithLabel
                            value={data?.mostTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="mostTitle"
                            type="text"
                            cssStyle={`form-control ${touch.mostTitle && error.mostTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.mostTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            searchTitle
                        </p>
                        <InputWithLabel
                            value={data?.searchTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="searchTitle"
                            type="text"
                            cssStyle={`form-control ${touch.searchTitle && error.searchTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.searchTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            picPath
                        </p>
                        <InputWithLabel
                            value={data?.picPath}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="picPath"
                            type="text"
                            cssStyle={`form-control ${touch.picPath && error.picPath ? "is-invalid" : ""}`}
                            placeholder={bannerData?.picPath}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditNewsTitles
