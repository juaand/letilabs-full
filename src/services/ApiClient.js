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
export const getModalFarmaco = () => http.get("/modalfarmacoiniciodata")
export const updateModalFarmaco = ({title, subTitle, description, id}) => http.patch("/updatemodalfarmaco", {title, subTitle, description, id})
export const getVadevecumData = () => http.get("/vadevecumdata")
export const updateUsInfoData = ({description, url, buttonTitle, id}) => http.patch("/updateusinfodata", {description, url, buttonTitle, id})
export const updateUnidadesData = ({logo, desc, url}, id) => http.patch("/updateunidadesiniciodata", {logo, desc, url, id})
export const updatePortfolioData = ({title, description}, id) => http.patch("/updateportfolioiniciodata", {title, description, id})
export const createPortfolio = ({superiorTitle, title, description}) => http.post("/createportfolioiniciodata", {superiorTitle, title, description})
export const updateTitlePortfolio = ({superiorTitle}) => http.post("/updatetitleportfolioiniciodata", {superiorTitle})
export const updateFarmacoData = ({title, subTitle, buttonTitle, id}) => http.patch("/updatefarmacoiniciodata", {title, subTitle, buttonTitle, id})
export const deleteCarItem = (id) => http.get(`/deleteportfolioitem/${id}`)
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
export const updateGalleryData = ({description, imgPath, title}, id) => http.patch("/updategalleryaboutus", {description, imgPath, title, id})
export const updateBannerData = ({description, imgURL, id}) => http.patch("/updatebannerdata", {description, imgURL, id})
export const updateTimelineAboutUs = ({year, desc, imgURL}, id) => http.patch(`/updatetimelineaboutus`, {year, desc, imgURL, id})
export const updateMarcandoPautaData = ({description, imgURL, id}) => http.patch("/updatemarcandopautadata", {description, imgURL, id})
export const updateMegatData = ({title, description, url, buttonTitle, id}) => http.patch("/updatemegatdata", {title, description, url, buttonTitle, id})

//admin edit routes our companies

export const getBannerOC = () => http.get("/bannerdataoc")
export const updateBannerDataOC = ({description, imgURL, id}) => http.patch("/updatebannerdataoc", {description, imgURL, id})
export const getOurCompaniesOC = () => http.get("/ourcompaniesoc")
export const updateOurCompaniesOC = ({name, logo, info, url}, id) => http.patch("/updateourcompaniesoc", {name, logo, info, url, id})
export const getBannerProductsOC = () => http.get("/bannerproductsoc")
export const updateBannerProductsOC = ({description, description2, imgURL, img2URL, img3URL, id}) => http.patch("/updatebannerproductsoc", {description, description2, imgURL, img2URL, img3URL, id})
export const getInnovationOC = () => http.get("/innovationoc")
export const updateInnovationOC = ({description, imgURL, id}) => http.patch("/updateinnovationoc", {description, imgURL, id})
export const getCareOC = () => http.get("/careoc")
export const updateCareOC = ({description, imgURL, id}) => http.patch("/updatecareoc", {description, imgURL, id})
export const getBottomOC = () => http.get("/bottomoc")
export const updateBottomOC = ({title, url, button, img}, id) => http.patch("/updatebottomoc", {title, url, button, img, id})

//admin edit routes our companies Leti

export const getBannerOCLeti = () => http.get("/bannerdataocleti")
export const updateBannerDataOCLeti = ({description, imgURL, id}) => http.patch("/updatebannerdataocleti", {description, imgURL, id})
export const getOurCompaniesInfoCardsLeti = () => http.get("/ourcompaniesinfocardsleti")
export const updateOurCompaniesInfoCardsLeti = ({title, info}, id) => http.patch("/updateourcompaniesinfocardsleti", {title, info, id})
export const getTimeLineLeti = () => http.get("/octimelineleti")
export const addTimeLineLetiData = ({desc, url, imgURL, button}) => http.post("/addoctimelineleti", {desc, url, imgURL, button})
export const updateTimeLineLetiData = ({desc, url, imgURL, button}, id) => http.patch("/updateoctimelineleti", {desc, url, imgURL, button, id})
export const getEquipoLetiOC = () => http.get("/ocequipoleti")
export const updateEquipoLetiOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.patch("/updateocequipoleti", {description, person, imgURL, buttonTitle, buttonLink, id})

//admin edit routes our companies Biocontrolled

export const getBannerOCBiocontrolled = () => http.get("/bannerdataocbiocontrolled")
export const updateBannerDataOCBiocontrolled = ({description, imgURL, id}) => http.patch("/updatebannerdataocbiocontrolled", {description, imgURL, id})
export const getOurCompaniesInfoCardsBiocontrolled = () => http.get("/ourcompaniesinfocardsbiocontrolled")
export const updateOurCompaniesInfoCardsBiocontrolled = ({title, info}, id) => http.patch("/updateourcompaniesinfocardsbiocontrolled", {title, info, id})
export const getTimeLineBiocontrolled = () => http.get("/octimelinebiocontrolled")
export const addTimeLineBiocontrolledData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.post("/addoctimelinebiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})
export const updateTimeLineBiocontrolledData = ({description, imgURL, buttonTitle, buttonLink}, id) => http.patch("/updateoctimelinebiocontrolled", {description, imgURL, buttonTitle, buttonLink, id})
export const getCarrouselBiocontrolled = () => http.get("/occarrouselbiocontrolled")
export const updateCarrouselBiocontrolledData = ({info}, id) => http.patch("/updateoccarrouselbiocontrolled", {info, id})
export const addCarrouselBiocontrolledData = ({info, id}) => http.post("/addoccarrouselbiocontrolled", {info, id})
export const getEquipoBiocontrolledOC = () => http.get("/ocequipobiocontrolled")
export const updateEquipoBiocontrolledOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.patch("/updateocequipobiocontrolled", {description, person, imgURL, buttonTitle, buttonLink, id})

//admin edit routes our companies Genven

export const getBannerOCGenven = () => http.get("/bannerdataocgenven")
export const updateBannerDataOCGenven = ({description, imgURL, id}) => http.patch("/updatebannerdataocgenven", {description, imgURL, id})
export const getOurCompaniesVideoGenven = () => http.get("/ourcompaniesvideogenven")
export const updateOurCompaniesVideoGenven = ({videoURL, id}) => http.get("/updateourcompaniesvideogenven", {videoURL, id})
export const getTimeLineGenven = () => http.get("/octimelinegenven")
export const addTimeLineGenvenData = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.get("/addoctimelinegenven", {description, person, imgURL, buttonTitle, buttonLink, id})
export const getProductosGenvenOC = () => http.get("/ocproductosgenven")
export const updateProductosGenvenOC = ({description, buttonTitle, buttonLink, img1URL, img2URL, img3URL, id}) => http.patch("/updateocproductosgenven", {description, buttonTitle, buttonLink, img1URL, img2URL, img3URL, id})
export const addProductosGenvenOC = ({description, buttonTitle, buttonLink, img1URL, img2URL, img3URL}) => http.post("/addocproductosgenven", {description, buttonTitle, buttonLink, img1URL, img2URL, img3URL})
export const getEquipoGenvenOC = () => http.get("/ocequipogenven")
export const updateEquipoGenvenOC = ({description, person, imgURL, buttonTitle, buttonLink, id}) => http.patch("/updateocequipogenven", {description, person, imgURL, buttonTitle, buttonLink, id})

//farmaco vigilancia routes
export const getFarmVigData = () => http.get("/farmvigdata")
export const vigilanciaForm = ({name, lastname, sex, medicine, date, effects, prescribed, email}) => http.post("/vigilancia", {name, lastname, sex, medicine, date, effects, prescribed, email})
export const dropVigCard = (id) => http.get(`/vigilancia/${id}/delete`)

//content routes
export const createContent = ({content, url, name}) => http.post("/update-content", {content, url, name})

//admin I+D routes
export const getBannerID = () => http.get("/bannerdataid")
export const updateBannerID = ({title, description, imgURL, id}) => http.patch("/updatebannerdataid", {title, description, imgURL, id})
export const getInfoCardsIdData = () => http.get("/idinfocards")
export const updateInfoCardsIdData = ({title, picPath, info, btn, id}) => http.patch("/updateidinfocards", {title, picPath, info, btn, id})
export const getGoalsIdData = () => http.get("/idgoals")
export const updateGoalsIdData = ({name, title, desc, id}) => http.patch("/updateidgoals", {name, title, desc, id})
export const updateGoalsTitle = ({title}) => http.post("/updateidgoalstitle", {title})
export const deleteIDGoals = (id) => http.get(`/deleteidgoals/${id}`)
export const createIDGoal = ({title, name, desc}) => http.post("/createidgoal", {title, name, desc})
export const getBottomIdData = () => http.get("/idbottom")
export const updateBottomId = ({title, img, url, btn, id}) => http.patch("/updateidbottom", {title, img, url, btn, id})


//admin I+D tech routes
export const getBannerTech = () => http.get("/bannertech")
export const updateBannerTech = ({title, description, imgURL, id}) => http.patch("/updatebannertech", {title, description, imgURL, id})
export const getVideoTech = () => http.get("/videotech")
export const updateVideoTech = ({title, videoURL, id}) => http.patch("/updatevideodatatech", {title, videoURL, id})
export const getCarouselTech = () => http.get("/carrouseltech")
export const updateCarouselTitleTech = ({mainTitle}) => http.post("/updatetechcarrouseltit", {mainTitle})
export const updateCarouselTech = ({title, imgURL, description, mainTitle, id}) => http.patch("/updatecarrouseltech", {title, imgURL, description, mainTitle, id})
export const createTechCarousel = ({title, imgURL, description, mainTitle}) => http.post("/createtechcarrousel", {title, imgURL, description, mainTitle})
export const deleteCarouselTech = (id) => http.get(`/carrouseltech/${id}/delete`)
export const getMapTech = () => http.get("/maptech")
export const updateMapTech = ({description, mapURL, id}) => http.patch("/updatemapdatatech", {description, mapURL, id})
export const getBottomTech = () => http.get("/bottomtech")
export const updateBottomTechData = ({title, img, buttonLink, buttonTitle, id}) => http.patch("/updatebottomtech", {title, img, buttonLink, buttonTitle, id})

//admin I+D manufacture routes
export const getBannerManufacture = () => http.get("/bannermanufacture")
export const updateBannerManufacture = ({title, description, imgURL, id}) => http.patch("/updatebannermanufacture", {title, description, imgURL, id})
export const updateTitleProccess = ({title}) => http.post("/updatetitleproccess", {title})
export const getCarouselManufacture = () => http.get("/carrouselmanufacture")
export const updateCarouselManufacture = ({title, info, id}) => http.patch("/updatecarrouselmanufacture", {title, info, id})
export const createProccess = ({title, info}) => http.post("/createproccess", {title, info})
export const deleteProccess = (id) => http.get(`/deleteproccess/${id}`)
export const deleteCertificate = (id) => http.get(`/deletecertificate/${id}`)
export const getCertificatesManufacture = () => http.get("/certificatesmanufacture")
export const updateCertificatesManufactureData = ({title, desc}) => http.post("/updatecertificatesmanufacture", {title, desc})
export const createCertificate = ({title, imgURL, desc}) => http.post("/createcertificatesmanufacture", {title, imgURL, desc})
export const getBottomManufactureData = () => http.get("/bottommanufacture")
export const updateBottomManufactureData = ({title, img, buttonLink, buttonTitle, id}) => http.patch("/updatebottommanufacture", {title, img, buttonLink, buttonTitle, id})


//admin I+D alliances routes
export const getBannerAlliances = () => http.get("/banneralliances")
export const updateBannerAlliances = ({title, description, imgURL, id}) => http.patch("/updatebanneralliances", {title, description, imgURL, id})
export const getLogoCarouselData = () => http.get("/alliancelogos")
export const updateTitleCarrouselAlliance = ({title}) => http.post("/updatealliancelogostitle", {title})
export const deleteLogoCarouselAlliance = (id) => http.get(`/alliancelogos/${id}/delete`)
export const createAlly = ({title, picPath}) => http.post("/createalliance", {title, picPath})
export const getFormAlliances = () => http.get("/allianceform")
export const updateFormAlliances = ({title, desc, phone, email, id}) => http.post("/updateallianceform", {title, desc, phone, email, id})
export const getBottomAlliancesData = () => http.get("/bottomalliances")
export const updateBottomAlliancesData = ({title, img, buttonLink, buttonTitle, id}) => http.patch("/updatebottomalliances", {title, img, buttonLink, buttonTitle, id})


//admin edit routes purpose and responsability
export const getBannerPurpose = () => http.get("/bannerdatapurpose")
export const updateBannerDataPurpose = ({description, imgURL, id}) => http.patch("/updatebannerdatapurpose", {description, imgURL, id})
export const getPurposeVideo = () => http.get("/purposevideo")
export const updatePurposeVideo = (videoURL, id) => http.patch("/updatepurposevideo", {videoURL, id})
export const getTimeLinePurpose = () => http.get("/timelinepurpose")
export const updateTimeLinePurpose = ({desc, imgURL, id}) => http.patch("/updatetimelinepurpose", {desc, imgURL, id})
export const deleteTimelinePurpose = (id) => http.get(`/deletetimelinepurpose/${id}`)
export const addTimeLinePurposeData = ({desc, imgURL}) => http.post("/addtimelinepurpose", {desc, imgURL})
export const updateTitleFarmDataPurpose = ({title, id}) => http.patch("/updatetitlefarmdatapurpose", {title, id})

//admin edit routes our people
export const getBannerOurPeople = () => http.get("/bannerdataourpeople")
export const updateBannerOurPeople = ({description, imgURL, title, id}) => http.patch("/updatebannerdataourpeople", {description, imgURL, title, id})
export const getInfoCardsOurPeople = () => http.get("/ourpeopleinfocards")
export const updateInfoCardsOurPeople = ({mainTitle, imgURL, title, info, id}) => http.patch("/updateourpeopleinfocards", {mainTitle, imgURL, title, info, id})
export const getEquipoOurPeople = () => http.get("/equipoourpeople")
export const updateEquipoOurPeople = ({title, description, person, imgURL, buttonTitle, buttonLink, id}) => http.patch("/updateourpeopleequipo", {title, description, person, imgURL, buttonTitle, buttonLink, id})
export const getBottomOurPeople = () => http.get("/bottomourpeople")
export const updateBottomOurPeople = ({title, buttoLink, buttonTitle, img, id}) => http.patch("/updatebottomourpeople", {title, buttoLink, buttonTitle, img, id})
export const getCarreras = () => http.get("/carrerasdata")
export const updateCarrerasData = ({title, description, url, buttonTitle, buttonLink, id}) => http.patch("/updatecarrerasdata", {title, description, url, buttonTitle, buttonLink, id})
export const deleteOPInfoCard = (id) => http.get(`/ourpeopleinfocard/${id}/delete`)
export const createTeam = ({title, info}) => http.post("/createteam", {title, info})
export const getBannerTeams = () => http.get("/bannerdatateams")
export const updateBannerTeams = ({mainTitle, imgURL, id}) => http.patch("/updatebannerdatateams", {mainTitle, imgURL, id})

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
export const productInfoForm = ({name, lastname, work, years, speciality, info, license, mail}) => http.post("/productinfoform", {name, lastname, work, years, speciality, info, license, mail})


// our philosophy page
export const getBannerOurPhilosophy = () => http.get("/bannerourphilosophy")
export const updateBannerOurPhilosophy = ({description, imgURL, title, id}) => http.patch("/updatebannerourphilosophy", {description, imgURL, title, id})
export const getInfoCardsOurPhilosophy = () => http.get("/ourphilosophyinfocards")
export const updateOPPillar = ({picPath, title, id}) => http.patch("/updateourphilosophyinfocards", {picPath, title, id})
export const deleteOPPillar = (id) => http.get(`/ourphilosophyinfocards/${id}/delete`)
export const createPillar = ({picPath, title}) => http.post("/createpillar", {picPath, title})
export const updateInfoCardsOurPhilosophy = ({picPath, title, id}) => http.patch("/updateourphilosophyinfocards", {picPath, title, id})
export const getLetterOurPhilosophy = () => http.get("/ourphilosophyletter")
export const updateLetterOurPhilosophy = ({body, imgURL, mainTitle, id}) => http.patch("/updateourphilosophyletter", {body, imgURL, mainTitle, id})
export const getBottomOurPhilosophy = () => http.get("/bottomourphilosophy")
export const updateBottomOurPhilosophy = ({title, imgURL, description, buttonLink, buttonTitle, id}) => http.patch("/updatebottomourphilosophy", {title, imgURL, description, buttonLink, buttonTitle, id})


//therapeutic areas page
export const getBannerTA = () => http.get("/bannerta")
export const updateBannerTA = ({title, description, imgURL, id}) => http.patch("/updatebannerta", {title, description, imgURL, id})
export const getCarrouselTA = () => http.get("/carrouselta")
export const updateCarrouselTA = ({title, mainTitle, desc, imgURL}, id) => http.patch("/updatecarrouselta", {title, mainTitle, desc, imgURL, id})
export const getBottomTA = () => http.get("/bottomta")
export const updateBottomTA = ({title, buttonLink, buttonTitle, img}, id) => http.patch("/updatebottomta", {title, buttonLink, buttonTitle, img, id})

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
