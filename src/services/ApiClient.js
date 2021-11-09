import axios from "axios"

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

http.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.clear()
            window.location.assign("/login")
        }

        return Promise.reject(error)
    }
)


//admin routes
export const login = ({email, password}) =>
    http.post("/login", {email, password})
export const logOut = () => http.post("/logout")


//farmaco vigilancia routes
export const getFarmVigData = () => http.get("/farmvigdata")

export const vigilanciaForm = ({name, lastname, sex, medicine, date, effects, prescribed}) => http.post("/vigilancia", {name, lastname, sex, medicine, date, effects, prescribed})

export const dropVigCard = (id) => http.get(`/vigilancia/${id}/delete`)

//content routes
export const createContent = ({content, url, name}) => http.post("/update-content", {content, url, name})

//search routes
export const searchContent = (search) => http.get(`/search/${search}`)