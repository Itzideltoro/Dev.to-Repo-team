let newItem = {}
let endpointURL = "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json"

//Listener de Inputs Agregar Nuevo Producto
$("input, select, textarea").change(event => {
    let property = event.target.name
    let value = event.target.value
    newItem[property] = value
    console.log(newItem)
})

//Listener de Boton Agregar Nuevo Producto
$(".btn-publish").click(() => {
    postAjax(newItem)
    // $("#addProduct").modal("hide")
})

//Request de CUD a AJAX
const postAjax = (theEntry) => {
    $.ajax({
        url: endpointURL,
        method: "POST",
        data: JSON.stringify(theEntry),
        success: data => {
            console.log(data)
        },
        error: "",
    });
}