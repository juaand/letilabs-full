import './LoginPage.css'
import React, {useState} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {login} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Form/FormButton/FormButton'
import {Redirect} from 'react-router-dom'
import {useFormState} from '../../../hooks/useFormState'


const LoginPage = () => {

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

    const {user} = useAuthContext()

    const [loginError, setLoginError] = useState(null)

    const authContext = useAuthContext()

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await login(data)
            authContext.login(user)
        } catch (err) {
            setLoginError(err.response?.data?.message)
        }
    }

    const isError = Object.values(error).some(err => err)

    if (user && user.role === 'Admin') {
        return <Redirect to="/admin" />
    }

    return (
        <main className="container-fluid LoginPage">
            <div className="container">
                <div className="leti-blue-triangle"></div>
                <div className="leti-red-triangle"></div>
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-xl-4 col-11">
                        <form onSubmit={handleSubmit}>
                            <InputWithLabel
                                value={data.email}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="email"
                                type="text"
                                label="Correo electrónico"
                                className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                placeholder="Enter email"

                            />

                            <InputWithLabel
                                value={data.password}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="password"
                                type="password"
                                label="Contraseña"
                                className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                            />

                            {loginError && <div className="alert alert-danger">{loginError}</div>}


                            <Button
                                type="submit"
                                className="leti-btn"
                                disabled={isError}
                            >Ingresa</Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default LoginPage