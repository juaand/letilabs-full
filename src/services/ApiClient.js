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

//admin edit routes inicio

export const getUsInfo = () => http.get("/usinfodata")
export const getCarousel = () => http.get("/carouseliniciodata")
export const getUnidades = () => http.get("/unidadesiniciodata")
export const getPortfolio = () => http.get("/portfolioiniciodata")
export const getFarmaco = () => http.get("/farmacoiniciodata")
export const updateUsInfoData = ({description, url, buttonTitle, id}) => http.patch("/updateusinfodata", {description, url, buttonTitle, id})
export const addCarouselData = ({desc, img, name}) => http.get("/addcarouseliniciodata", {desc, img, name})
export const updateUnidadesData = ({logo, desc, url, id}) => http.patch("/updateunidadesiniciodata", {logo, desc, url, id})
export const updatePortfolioData = ({title, description, id}) => http.patch("/updateportfolioiniciodata", {title, description, id})
export const updateFarmacoData = ({title, subTitle, buttonTitle, id}) => http.patch("/updatefarmacoiniciodata", {title, subTitle, buttonTitle, id})
export const deleteCarItem = (id) => http.get(`/deletecaritem/${id}`)
export const deleteUnitItem = (id) => http.get(`/deleteunititem/${id}`)

//admin edit routes about us

export const getTimeLine = () => http.get("/timelineaboutusdata")
export const getBanner = () => http.get("/bannerdata")
export const getMarcandoPauta = () => http.get("/marcandopautadata")
export const getMegat = () => http.get("/megatdata")
export const getGallery= () => http.get("/galleryaboutusdata")
export const addTimeLineData = ({year, imgURL, desc, id}) => http.get("/addtimelineaboutusdata", {year, imgURL, desc, id})
export const addGalleryData = ({mainTitle, title, imgPath, id}) => http.get("/addgalleryaboutusdata", {mainTitle, title, imgPath, id})
export const updateBannerData = ({description, imgURL, id}) => http.patch("/updatebannerdata", {description, imgURL, id})
export const updateMarcandoPautaData = ({description, imgURL, id}) => http.patch("/updatemarcandopautadata", {description, imgURL, id})
export const updateMegatData = ({title, description, url, buttonTitle, id}) => http.patch("/updatemegatdata", {title, description, url, buttonTitle, id})


//farmaco vigilancia routes
export const getFarmVigData = () => http.get("/farmvigdata")

export const vigilanciaForm = ({name, lastname, sex, medicine, date, effects, prescribed}) => http.post("/vigilancia", {name, lastname, sex, medicine, date, effects, prescribed})

export const dropVigCard = (id) => http.get(`/vigilancia/${id}/delete`)

//content routes
export const createContent = ({content, url, name}) => http.post("/update-content", {content, url, name})

//search routes
export const searchContent = (search) => http.get(`/search/${search}`)