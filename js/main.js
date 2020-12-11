let endpointPostData = "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json"
let containerPost = ".container-cards"
let allPost = {}
let filterActivated = false

//--------------------------------------------INICIO DE FUNCIONALIDAD DE FILTROS SEARCH Y DATE--------------------------------------------
//Listener filtros de Barra Fechas
$(".filters li").click(event => {
    filterActivated = true
    let filter = $(event.target).text()
    let today = new Date()
    let minDate = 0
    switch (filter) {
        case "Week":
            minDate = today - 518400000
            break
        case "Month":
            minDate = today - 2592000000
            break
        case "Year":
            minDate = today - 31622400000
            break
        case "Infinity":
            filterActivated = false
            break
        case "Feed":
            filterActivated = false
            break
    }
    getTheJson(filter, minDate)
})

//Listener Search
$(".input-search").change(event => {
    let stringToFilter = event.target.value
    stringToFilter === "" ? filterActivated = false : filterActivated = true
    getTheJson("search", stringToFilter)
})

//Request de GET a AJAX
const getTheJson = (origin, criteria) => {
    $.ajax({
        url: endpointPostData,
        method: "GET",
        success: data => {
            allPost = data
            //orderTheJson()
            gettingToCriteria(allPost, origin, criteria)
        },
        error: error => {
            console.log(error)
        },
    });
}

/*
//Falta ordenar el resultante 
 const orderTheJson = () => {
   // for(key in allPost){
     console.log(typeof allPost)   
   allPost = allPost.reverse();

  //  }      
}*/


//Manejo del Json obtenido dependiendo del criterio por filtro
const gettingToCriteria = (theJson, filter, criteria) => {
    let i = 0
    filter === "scroll" ? i = 1 : $(containerPost).empty()
    let flag = true
    for (key in theJson) {
        let object = theJson[key]
        let { title, datetime } = object
        let dateToCheck = new Date(datetime)
        if (filter === "search" || filter === "main" || filter === "scroll") {
            if (title.includes(criteria)) {
                fillDataToCards(object, i, filter)
                i++
            }
        }
        else {
            if (dateToCheck >= criteria && flag === true) {
                fillDataToCards(object, i)
                i++
                filter === "Latest" && i === 10 ? flag = false : flag = true
            }
        }
    }
    $(containerPost).html() === "" ? $(containerPost).html(`<p class="p-3 font-weight-bold w-100">No results match that query.</p>`) : addBtnListener()
}

//Llenado de Cards
const fillDataToCards = (object, i, filter) => {
    let { title, username, datetime, tags, URL } = object
    tags = tags.split(",") /*Esto puede cambiar si cambiamos el guardado en Write-Post*****/
    let firstPost = `
            <div class="class">
                <img class="img-fluid" src="${URL}" alt=""/>
            </div>`
    i === 0 && filter != "scroll" ? firstPost : firstPost = ""
    let newCard = `
            <section class="card rounded main-noticia">
                ${firstPost}
                <!-- aqui termina la imagen principal -->
                <!-- aqui empieza el usuario e imagen de usuario, nombre y fecha -->
                <div class="container bg-white">
                    <div class="row">
                        <div class="col mt-3">
                            <a class="htext hover d-flex">
                                <img class="imag-user3 img-fluid rounded-circle" src="https://picsum.photos/id/${i}/200/" alt="" />
                                <div class="etimain mb-1 ml-2">
                                    <h6 class="eti4 mb-0">${username}</h6>
                                    <span class="eti3">${datetime}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- aqui termina el usuario e imagen de usuario, nombre y fecha -->
                    <!-- aqui empieza la parte media card principal -->
                    <div class="row">
                        <div class="container">
                            <div class="row">
                                <div class="col mb-3">
                                    <a class="etimain hover d-flex">
                                        <div class=" mb-1">
                                            <h2 class="eti4 margn1">${title}</h2>
                                        </div>
                                    </a>
                                    <div class="etimain margn1">
                                        <a class="eti1 pr-2 rounded mr-1" href="#">${tags[0]}</a>
                                        <a class="eti2 pr-2 rounded mr-1" href="#">${tags[1]}</a>
                                        <a class="eti3 pr-2 rounded" href="#">${tags[2]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- aqui termina la parte media card principal -->
                    <!-- aqui empieza el footer card principal -->
                    <div class="container ml-4">
                        <div class="row">
                            <div class="container botonesm1 d-flex mr-4 mb-3">
                                <div class="col-6 p-0">
                                    <button type="button" class="margin1 boton1 mr-2 btn btn-light">12
                                        reactions</button>
                                    <button type="button" class="margin1 boton1 btn btn-light ">3
                                        comments</button>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-0">
                                    <div>
                                        <span class="h6i mr-2 align-middle">15 min read</span>
                                    </div>
                                    <button type="button"
                                        class="botonsave btn btn-outline-secondary" data-entry-key=${key}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `
    $(containerPost).append(newCard)
}
//--------------------------------------------FIN DE FUNCIONALIDAD DE FILTROS SEARCH Y DATE--------------------------------------------

//Listener para botones Save
const addBtnListener = () => {
    console.log("listener")
}

//--------------------------------------------INICIO FUNCIONALIDAD DE HTML POR POST--------------------------------------------
//Listener del card seleccionado  ************Falta
$(containerPost + " h2").click(event => {
    console.log("LISTEN CARD")
})

//--------------------------------------------FIN FUNCIONALIDAD DE HTML POR POST--------------------------------------------



//--------------------------------------------INICIO FUNCIONALIDAD SCROLL INFINITO--------------------------------------------
//Listener del scroll
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height() && filterActivated === false) {
        getTheJson("scroll", "")
    }
})
//--------------------------------------------FIN FUNCIONALIDAD SCROLL INFINITO--------------------------------------------


////--------------------------------------------INSTRUCCIONES INICIALES--------------------------------------------
getTheJson("main", "")