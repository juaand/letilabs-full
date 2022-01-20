import axios from "axios"

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    //baseURL: "https://grupoleti-api.herokuapp.com/",
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
export const getVadevecumData = () => http.get("/vadevecumdata")
export const updateUsInfoData = ({description, url, buttonTitle, id}) => http.patch("/updateusinfodata", {description, url, buttonTitle, id})
export const addCarouselData = ({desc, img, name}) => http.get("/addcarouseliniciodata", {desc, img, name})
export const updateUnidadesData = ({logo, desc, url, id}) => http.patch("/updateunidadesiniciodata", {logo, desc, url, id})
export const updatePortfolioData = ({title, description, id}) => http.patch("/updateportfolioiniciodata", {title, description, id})
export const updateFarmacoData = ({title, subTitle, buttonTitle, id}) => http.patch("/updatefarmacoiniciodata", {title, subTitle, buttonTitle, id})
export const deleteCarItem = (id) => http.get(`/deletecaritem/${id}`)
export const deleteUnitItem = (id) => http.get(`/deleteunititem/${id}`)
export const updateVideoData = (videoUrl) => http.patch("/updatevideodata", {videoUrl})

//admin edit routes about us

export const getTimeLine = () => http.get("/timelineaboutusdata")
export const getBanner = () => http.get("/bannerdata")
export const getMarcandoPauta = () => http.get("/marcandopautadata")
export const getMegat = () => http.get("/megatdata")
export const getGallery = () => http.get("/galleryaboutusdata")
export const addTimeLineData = ({year, imgURL, desc, id}) => http.get("/addtimelineaboutusdata", {year, imgURL, desc, id})
export const addGalleryData = ({mainTitle, title, imgPath, id}) => http.get("/addgalleryaboutusdata", {mainTitle, title, imgPath, id})
export const updateBannerData = ({description, imgURL, id}) => http.patch("/updatebannerdata", {description, imgURL, id})
export const updateMarcandoPautaData = ({description, imgURL, id}) => http.patch("/updatemarcandopautadata", {description, imgURL, id})
export const updateMegatData = ({title, description, url, buttonTitle, id}) => http.patch("/updatemegatdata", {title, description, url, buttonTitle, id})

//admin edit routes our companies

export const getBannerOC = () => http.get("/bannerdataoc")
export const updateBannerDataOC = ({description, imgURL, id}) => http.patch("/updatebannerdataoc", {description, imgURL, id})
export const getOurCompaniesOC = () => http.get("/ourcompaniesoc")
export const updateOurCompaniesOC = ({name, logo, info, url, id}) => http.get("/updateourcompaniesoc", {name, logo, info, url, id})
export const getBannerProductsOC = () => http.get("/bannerproductsoc")
export const updateBannerProductsOC = ({description, description2, imgURL, img2URL, img3URL, id}) => http.get("/updatebannerproductsoc", {description, description2, imgURL, img2URL, img3URL, id})
export const getInnovationOC = () => http.get("/innovationoc")
export const updateInnovationOC = ({description, imgURL, id}) => http.patch("/updateinnovationoc", {description, imgURL, id})
export const getCareOC = () => http.get("/careoc")
export const updateCareOC = ({description, imgURL, id}) => http.patch("/updatecareoc", {description, imgURL, id})
export const getBottomOC = () => http.get("/bottomoc")
export const updateBottomOC = ({title, url, button, img, id}) => http.patch("/updatebottomoc", {title, url, button, img, id})

//admin edit routes our companies Leti

export const getBannerOCLeti = () => http.get("/bannerdataocleti")
export const updateBannerDataOCLeti = ({description, imgURL, id}) => http.patch("/updatebannerdataocleti", {description, imgURL, id})
export const getOurCompaniesInfoCardsLeti = () => http.get("/ourcompaniesinforcardsleti")
export const updateOurCompaniesInfoCardsLeti = ({title, info, id}) => http.get("/updateourcompaniesinfocardsleti", {title, info, id})
export const getTimeLineLeti = () => http.get("/octimelineleti")
export const addTimeLineLetiData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelineleti", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getEquipoLetiOC = () => http.get("/ocequipoleti")
export const updateEquipoLetiOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateocequipoleti", {description, person, imgURL, buttonTitle, buttonLink, id})

//admin edit routes our companies Biocontrolled

export const getBannerOCBiocontrolled = () => http.get("/bannerdataocbiocontrolled")
export const updateBannerDataOCBiocontrolled = ({description, imgURL, id}) => http.patch("/updatebannerdataocbiocontrolled", {description, imgURL, id})
export const getOurCompaniesInfoCardsBiocontrolled = () => http.get("/ourcompaniesinforcardsbiocontrolled")
export const updateOurCompaniesInfoCardsBiocontrolled = ({title, info, id}) => http.get("/updateourcompaniesinfocardsbiocontrolled", {title, info, id})
export const getTimeLineBiocontrolled = () => http.get("/octimelinebiocontrolled")
export const addTimeLineBiocontrolledData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelinebiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getCarrouselBiocontrolled = () => http.get("/occarrouselbiocontrolled")
export const addCarrouselBiocontrolledData = ({info, id}) => http.get("/addoccarrouselbiocontrolled", {info, id})
export const getEquipoBiocontrolledOC = () => http.get("/ocequipobiocontrolled")
export const updateEquipoBiocontrolledOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateocequipobiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})


//farmaco vigilancia routes
export const getFarmVigData = () => http.get("/farmvigdata")
export const vigilanciaForm = ({name, lastname, sex, medicine, date, effects, prescribed}) => http.post("/vigilancia", {name, lastname, sex, medicine, date, effects, prescribed})
export const dropVigCard = (id) => http.get(`/vigilancia/${id}/delete`)

//content routes
export const createContent = ({content, url, name}) => http.post("/update-content", {content, url, name})

//search routes
export const searchContent = (search) => http.get(`/search/${search}`)
export const searchNews = (data) => http.post(`/buscarnoticia`, {data})

//product routes
export const getProduct = (buscar) => http.post("/producstdata", {buscar})
export const getProductList = () => http.get("/listado-productos")

//news routes
export const getNews = () => http.get("/newsdata")
export const getRandomNews = (category) => http.post("/getrandomnews", {category})