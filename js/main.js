/* Clase de la planta */
class Planta{
    constructor(id, nombrePlanta, precio, imagen){
        this.id= id
        this.nombrePlanta = nombrePlanta
        this.precio = precio
        this.imagen = imagen    
    }

}

//Instancio plantitas :) 

const planta1 = new Planta(1,"Peperomia",500,"../img/img-1.jpg")
const planta2 = new Planta(2,"Tulipa blancos",800,"../img/img-2.jpg")
const planta3 = new Planta(3,"Phalaenopsis",850,"../img/img-3.webp")
const planta4 = new Planta(4,"Petunia",770,"../img/img-4.jpg")
const planta5 = new Planta(5,"Gerbera",550,"../img/img-6.jpg")
const planta6 = new Planta(6,"Morifolium",600,"../img/img-7.jpg")
const planta7 = new Planta(7,"Cala",750,"../img/img-8.jpg")

//Creo array de plantas
let arrayPlantas = []
/* verifico que se  se encuentre en el storage el array con las plantas */
if(localStorage.getItem("plantas")){
/* Si existe el array, lo traigo  */
    arrayPlantas = JSON.parse(localStorage.getItem("plantas"))
}else{
    /* Sino existe lo creo */
    arrayPlantas.push(planta1, planta2, planta3, planta4,planta5, planta6, planta7)
    localStorage.setItem("plantas", JSON.stringify(arrayPlantas))
    
}


//Comienzo de DOM

let boxContainerDiv = document.getElementById("id-box-container")
/*Mostar las plantas  */
//capturo ID del boton
let verPlantas = document.getElementById("verPlantas")
//paso evento:
verPlantas.addEventListener("click",()=> {
    mostrarPlantas(arrayPlantas)
})
/*Ocultar las plantas  */
let ocultarPlantas = document.getElementById("ocultarPlantas")
ocultarPlantas.addEventListener("click",()=>{
    /* Reinicio el div, lo dejo en blanco */
    boxContainerDiv.innerHTML = ``
})

/* Ordenar las plantas */
/* caputor el ID */
let selectOrden = document.getElementById("selectOrden")

selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    switch(selectOrden.value){
        case "1":
            ordernarMayorMenor(arrayPlantas)
        break
        case "2":
            ordernarMenorMayor(arrayPlantas)
        break
        case "3":
            ordenarAlfabeticamenteNombre(arrayPlantas)
        break
        default:
            mostrarPlantas(arrayPlantas)
        break
    }
})
/* Agregar plantas */
//capturo ID del btn
let agregarPlantaBtn = document.getElementById("guardarPlantaBtn")

agregarPlantaBtn.addEventListener("click", function(event){
    event.preventDefault()
    agregarPlanta(arrayPlantas)
})



/* Funciones */
/* Funcion que muestra todo lo almacenado en el un array */
function mostrarPlantas(array){
    console.log("ERRNTREEE")
    boxContainerDiv.innerHTML=``
    //recorrer el  array para imprimir en el DOM
    for(let planta of array){
        let nuevoBoxDiv = document.createElement("div")
        //agregamos class
        nuevoBoxDiv.className ="box"
        nuevoBoxDiv.innerHTML=`
                            <span class="discount">-10%</span>
                            <div class="imagen">
                                <img src="${planta.imagen}" alt="Imagen de ${planta.nombrePlanta}">
                            
                                <div class="icons">
                                    <a href="#" class="fas fa-heart"></a>
                                    <a href="#" class="cart-btn">añadir al carrito</a>
                                    <a href="#" class="fas fa-share"></a>
                                </div>
                            </div>                       
                            <div class="content">
                                <h3>${planta.nombrePlanta}</h3>
                                <div class="precio">$${precio = calcularDescuento(planta.precio)} <span>${planta.precio}</span></div>
                            </div>`
        boxContainerDiv.appendChild(nuevoBoxDiv)
    }
}

function calcularDescuento(precioOriginal){
    const precioConDescuento = precioOriginal - (precioOriginal * (0.1 / 100));
    return precioConDescuento
}



//funciones para agregar plantas
function agregarPlanta(array){
    //capturamos los Input
    let nombrePlanta = document.getElementById("nombrePlantaInput")
    let precio = document.getElementById("precioInput")
    
    //creamos la planta nueva
    const plantaNueva = new Planta(array.length+1,nombrePlanta.value, precio.value, "../img/img-default.jpg")
    //pusheamos la planta
    array.push(plantaNueva)
    localStorage.setItem("plantas",JSON.stringify(array))
    mostrarPlantas(array)

    //resetamos  los valores del form

    precio.value= ""
    nombrePlanta.value = ""
}



//funciones para ordernar
function ordernarMayorMenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((planta1 ,planta2) => planta2.precio - planta1.precio)
    mostrarPlantas(mayorMenor)
}

function ordernarMenorMayor(array){
    const menorMayor = [].concat(array)
    menorMayor.sort((planta1 ,planta2) => planta1.precio - planta2.precio)
    mostrarPlantas(menorMayor)
}

function ordenarAlfabeticamenteNombre(array){
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort( (a,b)=>{
        if(a.nombrePlanta > b.nombrePlanta){
            return 1
        }
        if(a.nombrePlanta < b.nombrePlanta){
            return -1
        }
        return 0
    })
    mostrarPlantas(arrayAlfabetico)
}