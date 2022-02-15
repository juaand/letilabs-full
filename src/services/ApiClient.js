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
export const getUnidades = () => http.get("/unidadesiniciodata")
export const getPortfolio = () => http.get("/portfolioiniciodata")
export const getFarmaco = () => http.get("/farmacoiniciodata")
export const getVadevecumData = () => http.get("/vadevecumdata")
export const updateUsInfoData = ({description, url, buttonTitle, id}) => http.patch("/updateusinfodata", {description, url, buttonTitle, id})
export const updateUnidadesData = ({logo, desc, url}, id) => http.patch("/updateunidadesiniciodata", {logo, desc, url, id})
export const updatePortfolioData = ({title, description, id}) => http.patch("/updateportfolioiniciodata", {title, description, id})
export const updateFarmacoData = ({title, subTitle, buttonTitle, id}) => http.patch("/updatefarmacoiniciodata", {title, subTitle, buttonTitle, id})
export const deleteCarItem = (id) => http.get(`/deletecaritem/${id}`)
export const deleteUnitItem = (id) => http.get(`/deleteunititem/${id}`)
export const getApiVideo = () => http.get("/videoiniciodata")
export const updateVideoData = (url, id) => http.patch("/updatevideodata", {url, id})
export const getHomeBottom = () => http.get("/homebottomdata")
export const addHomeScreen = (show_in_home, id) => http.post(`/addprodtohomescreen/${id}`, {show_in_home, id})

//admin edit routes about us

export const getTimeLine = () => http.get("/timelineaboutusdata")
export const getBanner = () => http.get("/bannerdata")
export const getMarcandoPauta = () => http.get("/marcandopautadata")
export const getMegat = () => http.get("/megatdata")
export const getGallery = () => http.get("/galleryaboutusdata")
export const addTimeLineData = ({year, imgURL, desc, id}) => http.get("/addtimelineaboutusdata", {year, imgURL, desc, id})
export const addGalleryData = ({mainTitle, title, imgPath, id}) => http.get("/addgalleryaboutusdata", {mainTitle, title, imgPath, id})
export const updateBannerData = ({description, imgURL, id}) => http.patch("/updatebannerdata", {description, imgURL, id})
export const updateTimelineAboutUs = (year, desc, imgURL, id) => http.patch(`/updatetimelineaboutus/${id}`, {year, desc, imgURL, id})
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
export const getOurCompaniesInfoCardsLeti = () => http.get("/ourcompaniesinfocardsleti")
export const updateOurCompaniesInfoCardsLeti = ({title, info, id}) => http.get("/updateourcompaniesinfocardsleti", {title, info, id})
export const getTimeLineLeti = () => http.get("/octimelineleti")
export const addTimeLineLetiData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelineleti", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getEquipoLetiOC = () => http.get("/ocequipoleti")
export const updateEquipoLetiOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateocequipoleti", {description, person, imgURL, buttonTitle, buttonLink, id})

//admin edit routes our companies Biocontrolled

export const getBannerOCBiocontrolled = () => http.get("/bannerdataocbiocontrolled")
export const updateBannerDataOCBiocontrolled = ({description, imgURL, id}) => http.patch("/updatebannerdataocbiocontrolled", {description, imgURL, id})
export const getOurCompaniesInfoCardsBiocontrolled = () => http.get("/ourcompaniesinfocardsbiocontrolled")
export const updateOurCompaniesInfoCardsBiocontrolled = ({title, info, id}) => http.get("/updateourcompaniesinfocardsbiocontrolled", {title, info, id})
export const getTimeLineBiocontrolled = () => http.get("/octimelinebiocontrolled")
export const addTimeLineBiocontrolledData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelinebiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getCarrouselBiocontrolled = () => http.get("/occarrouselbiocontrolled")
export const addCarrouselBiocontrolledData = ({info, id}) => http.get("/addoccarrouselbiocontrolled", {info, id})
export const getEquipoBiocontrolledOC = () => http.get("/ocequipobiocontrolled")
export const updateEquipoBiocontrolledOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateocequipobiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})

//admin edit routes our companies Genven

export const getBannerOCGenven = () => http.get("/bannerdataocgenven")
export const updateBannerDataOCGenven = ({description, imgURL, id}) => http.patch("/updatebannerdataocgenven", {description, imgURL, id})
export const getOurCompaniesVideoGenven = () => http.get("/ourcompaniesvideogenven")
export const updateOurCompaniesVideoGenven = ({videoURL, id}) => http.get("/updateourcompaniesvideogenven", {videoURL, id})
export const getTimeLineGenven = () => http.get("/octimelinegenven")
export const addTimeLineGenvenData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelinegenven", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getProductosGenvenOC = () => http.get("/ocproductosgenven")
export const updateProductosGenvenOC = ({info, id}) => http.get("/addocproductosgenven", {info, id})
export const getEquipoGenvenOC = () => http.get("/ocequipogenven")
export const updateEquipoGenvenOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateocequipogenven", {description, person, imgURL, buttonTitle, buttonLink, id})

//farmaco vigilancia routes
export const getFarmVigData = () => http.get("/farmvigdata")
export const vigilanciaForm = ({name, lastname, sex, medicine, date, effects, prescribed, email}) => http.post("/vigilancia", {name, lastname, sex, medicine, date, effects, prescribed, email})
export const dropVigCard = (id) => http.get(`/vigilancia/${id}/delete`)

//content routes
export const createContent = ({content, url, name}) => http.post("/update-content", {content, url, name})

//admin I+D routes
export const getBannerID = () => http.get("/bannerdataid")
export const updateBannerID = ({title, description, imgURL, id}) => http.get("/updatebannerdataid", {title, description, imgURL, id})
export const getInfoCardsIdData = () => http.get("/idinfocards")
export const updateInfoCardsIdData = ({title, picPath, info, btn, id}) => http.get("/updateidinfocards", {title, picPath, info, btn, id})
export const getGoalsIdData = () => http.get("/idgoals")
export const updateGoalsIdData = ({name, title, desc, id}) => http.get("/updateidgoals", {name, title, desc, id})
export const getBottomIdData = () => http.get("/idbottom")
export const updateBottomId = ({title, img, url, btn, id}) => http.get("/updateidbottom", {title, img, url, btn, id})


//admin I+D tech routes
export const getBannerTech = () => http.get("/bannertech")
export const updateBannerTech = ({title, description, imgURL, id}) => http.get("/updatebannerdatatech", {title, description, imgURL, id})
export const getVideoTech = () => http.get("/videotech")
export const updateVideoTech = ({title, videoURL, id}) => http.get("/updatevideodatatech", {title, videoURL, id})
export const getCarouselTech = () => http.get("/carrouseltech")
export const updateCarouselTech = ({title, imgURL, description, mainTitle, id}) => http.get("/updatecarrouseltech", {title, imgURL, description, mainTitle, id})
export const getMapTech = () => http.get("/maptech")
export const updateMapTech = ({description, mapURL, id}) => http.get("/updatemapdatatech", {description, mapURL, id})
export const getBottomTech = () => http.get("/bottomtech")
export const updateBottomTechData = ({title, img, url, btn, id}) => http.get("/updatebottomtech", {title, img, url, btn, id})

//admin I+D manufacture routes
export const getBannerManufacture = () => http.get("/bannermanufacture")
export const updateBannerManufacture = ({title, description, imgURL, id}) => http.get("/updatebannerdatamanufacture", {title, description, imgURL, id})
export const getCarouselManufacture = () => http.get("/carrouselmanufacture")
export const updateCarouselManufacture = ({title, info, id}) => http.get("/updatecarrouselmanufacture", {title, info, id})
export const getCertificatesManufacture = () => http.get("/certificatesmanufacture")
export const updateCertificatesManufactureData = ({title, imgURL, desc, id}) => http.get("/updatecertificatesmanufacture", {title, imgURL, desc, id})
export const getBottomManufactureData = () => http.get("/bottommanufacture")
export const updateBottomManufactureData = ({title, img, url, btn, id}) => http.get("/updatebottommanufacture", {title, img, url, btn, id})


//admin I+D alliances routes
export const getBannerAlliances = () => http.get("/banneralliances")
export const updateBannerAlliances = ({title, description, imgURL, id}) => http.get("/updatebannerdataid", {title, description, imgURL, id})
export const getLogoCarouselData = () => http.get("/alliancelogos")
export const updateLogoCarouselDataAlliances = ({title, picPath, id}) => http.get("/updatealliancelogos", {title, picPath, id})
export const getFormAlliances = () => http.get("/allianceform")
export const updateFormAlliances = ({title, desc, phone, email, id}) => http.get("/updateallianceform", {title, desc, phone, email, id})
export const getBottomAlliancesData = () => http.get("/bottomalliances")
export const updateBottomAlliancesData = ({title, img, url, btn, id}) => http.get("/bottomalliances", {title, img, url, btn, id})


//admin edit routes purpose and responsability
export const getBannerPurpose = () => http.get("/bannerdatapurpose")
export const updateBannerDataPurpose = ({description, imgURL, id}) => http.patch("/updatebannerdatapurpose", {description, imgURL, id})
export const getPurposeVideo = () => http.get("/purposevideo")
export const updatePurposeVideo = ({videoURL, id}) => http.get("/updatepurposevideo", {videoURL, id})
export const getTimeLinePurpose = () => http.get("/timelinepurpose")
export const addTimeLinePurposeData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addtimelinepurpose", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getTitleFarmPurpose = () => http.get("/titlefarmdatapurpose")
export const updateTitleFarmDataPurpose = ({title, id}) => http.patch("/updatetitlefarmdatapurpose", {title, id})

//admin edit routes our people
export const getBannerOurPeople = () => http.get("/bannerdataourpeople")
export const updateBannerOurPeople = ({description, imgURL, title, id}) => http.patch("/updatebannerdataourpeople", {description, imgURL, title, id})
export const getInfoCardsOurPeople = () => http.get("/ourpeopleinfocards")
export const updateInfoCardsOurPeople = ({mainTitle, imgURL, title, info, id}) => http.patch("/updateourpeopleinfocards", {mainTitle, imgURL, title, info, id})
export const getEquipoOurPeople = () => http.get("/equipoourpeople")
export const updateEquipoOurPeople = ({title, description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/updateourpeopleequipo", {title, description, person, imgURL, buttonTitle, buttonLink, id})
export const getBottomOurPeople = () => http.get("/bottomourpeople")
export const updateBottomOurPeople = ({title, url, button, img, id}) => http.patch("/updatebottomourpeople", {title, url, button, img, id})
export const getCarreras = () => http.get("/carrerasdata")
export const updateCarrerasData = ({title, description, url, buttonTitle, id}) => http.patch("/updatecarrerasdata", {title, description, url, buttonTitle, id})


//search routes
export const searchContent = (search) => http.get(`/search/${search}`)
export const searchNews = (data) => http.post(`/buscarnoticia`, {data})

//product routes    
export const getProduct = (buscar) => http.post("/producstdata", {buscar})
export const getProductList = () => http.get("/listado-productos")
export const deleteProduct = (id) => http.get(`/producto/${id}/delete`)
export const updateProduct = ({id, name, picPath, QRpath, line, composition, health_register, active_principle, posology, presentation, indication}) => http.patch(`/producto/${id}/update`, {name, picPath, QRpath, line, composition, health_register, active_principle, posology, presentation, indication})
export const addProductApi = ({name, line, health_register, picPath, QRpath, active_principle, posology, presentation, composition, indication}) => http.post("/crear-producto", {name, line, health_register, picPath, QRpath, active_principle, posology, presentation, composition, indication})
export const getProductBanner = () => http.get("/bannerproduct")
export const updateProductBanner = ({description, imgURL, title, button1Title, button1Link, button2Title, button2Link, id}) => http.patch("/updatebannerproducts", {description, imgURL, title, button1Title, button1Link, button2Title, button2Link, id})
export const getProductBottom = () => http.get("/bottomproduct")
export const updateProductBottom = ({findProductsTitle, imgURL, title, buttonTitle, farmacoTitle, farmacoBtn, farmacoDesc, id}) => http.patch("/updateproductbottom", {findProductsTitle, imgURL, title, buttonTitle, farmacoTitle, farmacoBtn, farmacoDesc, id})
export const getProductListBanner = () => http.get("/listadoproductosbanner")
export const updateProductListBanner = ({description, imgURL, title, id}) => http.patch("/updatelistadoproductosbanner", {description, imgURL, title, id})


// our philosophy page
export const getBannerOurPhilosophy = () => http.get("/bannerourphilosophy")
export const updateBannerOurPhilosophy = ({description, imgURL, title, id}) => http.patch("/updatebannerourphilosophy", {description, imgURL, title, id})
export const getInfoCardsOurPhilosophy = () => http.get("/ourphilosophyinfocards")
export const updateOPPillar = ({picPath, title, id}) => http.patch("/updateourphilosophyinfocards", {picPath, title, id})
export const deleteOPPillar = (id) => http.get(`/ourphilosophyinfocards/${id}/delete`)
export const createPillar = ({picPath, title}) => http.post("/createpillar", {picPath, title})
export const getLetterOurPhilosophy = () => http.get("/ourphilosophyletter")
export const updateLetterOurPhilosophy = ({body, imgURL, mainTitle, id}) => http.patch("/updateourphilosophyletter", {body, imgURL, mainTitle, id})
export const getBottomOurPhilosophy = () => http.get("/bottomourphilosophy")
export const updateBottomOurPhilosophy = ({title, imgURL, description, buttonLink, buttonTitle, id}) => http.patch("/updatebottomourphilosophy", {title, imgURL, description, buttonLink, buttonTitle, id})


//therapeutic areas page
export const getBannerTA = () => http.get("/bannerta")
export const updateBannerTA = ({title, description, imgURL, id}) => http.patch("/updatebannerta", {title, description, imgURL, id})
export const getCarrouselTA = () => http.get("/carrouselta")
export const updateCarrouselTA = ({title, mainTitle, desc, imgURL, id}) => http.patch("/updatecarrouselta", {title, mainTitle, desc, imgURL, id})
export const getBottomTA = () => http.get("/bottomta")
export const updateBottomTA = ({title, buttonLink, buttonTitle, img, id}) => http.patch("/updatebottomta", {title, buttonLink, buttonTitle, img, id})

//news routes
export const getNews = () => http.get("/newsdata")
export const getTags = () => http.get("/tagsdata")
export const deleteTag = (id) => http.get(`/tag/${id}/delete`)
export const createTag = (tag) => http.post("/createtag", {tag})
export const getNewsTitles = () => http.get("/newstitles")
export const updateNewsTitles = ({lastestTitle, mostTitle, searchTitle, picPath, id}) => http.patch("/updatenewstitles", {lastestTitle, mostTitle, searchTitle, picPath, id})
export const addNewsApi = ({title, subTitle, urlToPic, tag, content, outstanding, publishDate}) => http.post("/createnews", {title, subTitle, urlToPic, tag, content, outstanding, publishDate})
export const getRandomNews = (category) => http.post("/getrandomnews", {category})
export const addOutstandingNews = (outstanding, id) => http.post(`/addoutstandingnews/${id}`, {outstanding, id})
export const deleteNews = (id) => http.get(`/news/${id}/delete`)
export const updateNews = ({title, subTitle, urlToPic, tag, content, outstanding, publishDate, id}) => http.patch(`/updatenews/${id}`, {title, subTitle, urlToPic, tag, content, outstanding, publishDate, id})
