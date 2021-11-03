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
            window.location.assign("/admin")
        }

        return Promise.reject(error)
    }
)

//admin.routes
// export const getAllbiopsies = () => http.get('/biopsies')
// export const getAllPatients = () => http.get('/patients')
// export const deleteDate = (dateId) => http.get(`/delete-date/${dateId}`)
// export const getPatientHistories = (id) => http.get(`/histories/${id}`)
// export const createDate = ({userId, date}) => http.post("/add-date", {userId, date})
// export const addPatient = ({
//     name,
//     email,
//     dni,
//     address,
//     zipcode,
//     city,
//     phone,
//     birthdate,
//     sex,
//     work,
//     insurance_carrier,
//     marital_status
// }) => http.post('/patient/add', {
//     name,
//     email,
//     dni,
//     address,
//     zipcode,
//     city,
//     phone,
//     birthdate,
//     sex,
//     work,
//     insurance_carrier,
//     marital_status
// })

//user.routes
export const doLogin = ({email, password}) =>
    http.post("/admin", {email, password})
export const logOut = () => http.post("/logout")

//admin.routes
export const edit = () => http.get("/admin/edit")

//biopsy.routes
export const dropBiopsy = (id) => http.get(`/biopsy/${id}/delete`)
export const updateBiopsy = (id) => http.patch(`/biopsy/${id}/update`)
export const addBiopsy = ({clinic_diagnosis, diagnostics, dni, material, name, reference, report}) => http.post('/biopsy/add', {clinic_diagnosis, diagnostics, dni, material, name, reference, report})

//blog.routes
export const getAllBlogs = () => http.get('/blogs')



//crud.routes
export const register = ({name, email, password, dni}) =>
    http.post("/register", {name, email, password, dni})

export const updateUser = ({
    name,
    role,
    address,
    phone,
    city,
    zipcode,
    id,
    quote,
    services,
    disciplines,
}) =>
    http.patch(`/user-profile/${id}/edit`, {
        name,
        role,
        address,
        phone,
        city,
        zipcode,
        id,
        quote,
        services,
        disciplines,
    })

export const updateUserAvatar = (data, id) => {
    let fd = new FormData()
    fd.append("file", data)

    const config = {headers: {"Content-Type": "multipart/form-data"}}
    return http.post(`/user-profile/${id}/edit-avatar`, fd, config)
}

export const updatePassword = ({password, newpassword, id}) =>
    http.post(`/update-password/${id}`, {password, newpassword})

export const deleteUser = (id) => http.get(`/user/${id}/delete`)
