import './LoginAdmin.css'
import React, {useState} from 'react'
import {useFormState} from '../../../hooks/useFormState'
import {useAuthContext} from '../../../contexts/AuthContext'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Form/FormButton/FormButton'
import {doLogin} from '../../../services/ApiClient'



function LoginAdmin() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                email: "",
                password: ""
            },
            error: {
                email: true,
                password: true
            },
            touch: {},
        },
        {
            email: v => v.length,
            password: v => v.length
        }
    )

    const {data, error, touch} = state

    const [loginError, setLoginError] = useState(null)

    const authContext = useAuthContext()

    const isError = Object.values(error).some(err => err)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await doLogin(data)
            authContext.login(user)
        } catch (err) {
            setLoginError(err.response?.data?.message)
        }
    }



    return (

        <div>
            <div>
                <div className="row align-items-center your justify-content-center your">
                    <div className="Modal__body col-12 col-sm-5">
                        <div className="Modal__header Modal__header__login"></div>
                        <div className="Modal__body__info">

                            

                            <form onSubmit={handleLogin}>

                                <InputWithLabel
                                    value={data.email}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="email"
                                    type="email"
                                    className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                    placeholder="Enter your email"

                                />

                                <InputWithLabel
                                    value={data.password}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="password"
                                    type="password"
                                    className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                    placeholder="Enter your password"
                                />


                                {loginError && <div className="Modal__alert alert alert-danger">{loginError}</div>}


                                <Button
                                    type="submit"
                                    className="Button Button__enter"
                                    disabled={isError}
                                >
                                    Log in
                                </Button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default LoginAdmin
