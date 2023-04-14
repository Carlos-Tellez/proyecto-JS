
var carritoVisible = false;  //esta variable mantiene el eatado visible del carrito de compras//

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //funcionalidad para los botones eliminar en el carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Funcionalidad para los botones sumar + cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Funcionalidad para los botones restar - cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Funcionalidad para los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Funcionalidad para el boton comprar 
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra, se realizo con Exito");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funcion que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funcion que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
        item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    
    actualizarTotalCarrito();

    //la siguiente funcion controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funcion que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}

// Buscador de articulos 

let products = {
    data:[
        {
            productName: "Dragon Ball Super vol 13",
            category:"Manga",
            precio: "$70.000",
            cantstokc: "10 unidades",
            Image: "../IMG/Manga1.jpg",
        },
        {
            productName: "My Hero Academy vol 26",
            category:"Manga",
            precio: "$50.000",
            cantstokc: "15 unidades",
            Image: "../IMG/manga2.jpg",
        },
        {
            productName: "One Piece vol 99",
            category:"Manga",
            precio: "$70.000",
            cantstokc: "08 unidades",
            Image: "../IMG/Manga3.jpg",
        },
        {
            productName: "Camisa Unisex Anime Coleccion",
            category:"Camisas",
            precio: "$40.000",
            cantstokc: "30 unidades",
            Image: "../IMG/camisa1.jpg",
        },
        {
            productName: "Camisa Unisex Anime Furia",
            category:"Camisas",
            precio: "$40.000",
            cantstokc: "20 unidades",
            Image: "../IMG/camisa1.jpg",
        },
        {
            productName: "Camisa Unisex Anime Legacy",
            category:"Camisas",
            precio: "$40.000",
            cantstokc: "25 unidades",
            Image: "../IMG/camisa1.jpg",
        },
        {
            productName: "AMAZING SPIDER MAN",
            category:"Comics",
            precio: "$85.000",
            cantstokc: "09 unidades",
            Image: "../IMG/comic1.jpg",
        },
        {
            productName: "Superman",
            category:"Comics",
            precio: "$81.000",
            cantstokc: "12 unidades",
            Image: "../IMG/comic2.jpg",
        },
        {
            productName: "Star Wars",
            category:"Comics",
            precio: "$130.000",
            cantstokc: "05 unidades",
            Image: "../IMG/comic3.jpg",
        },
        {
            productName: "FIGURA DE GEMINIS (SAINT SEIYA) BANDAI",
            category:"Figuras",
            precio: "$170.000",
            cantstokc: "06 unidades",
            Image: "../IMG/figura1.jpg",
        },
        {
            productName: "FIGURA DE MINATO (NARUTO) BANDAI",
            category:"Figuras",
            precio: "$140.000",
            cantstokc: "04 unidades",
            Image: "../IMG/figura2.jpg",
        },
        {
            productName: "FIGURA DE LUFFY (ONE PIECE) BANDAI",
            category:"Figuras",
            precio: "$140.000",
            cantstokc: "Agotado",
            Image: "../IMG/figura3.jpg",
        },
        {
            productName: "Funko Pop - Rokect",
            category:"Nuevo",
            precio: "proximamente",
            cantstokc: "05 unidades",
            Image: "../IMG/funko.jpg",
        },
        {
            productName: "Album One Piece - Pannini",
            category:"Nuevo",
            precio: "proximamente",
            cantstokc: "40 unidades",
            Image: "../IMG/album.jpg",
        },
        {
            productName: "Maleta Star wars",
            category:"Nuevo",
            precio: "proximamente",
            cantstokc: "3 unidades",
            Image: "../IMG/maleta.jpg",
        },
    ],
};


for(let i of products.data){
    //creamos la card
    let card = document.createElement("div");
    //la tarjeta debe tener la categoria y debe permanecer oculta inicialmente
    card.classList.add("card", i.category, "hide");
    // imagen div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    let image = document.createElement("img");
    image.setAttribute("src", i.Image); //i
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //nombre del producto
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //precio
    let precio = document.createElement("h6")
    precio.innerText = i.precio;
    container.appendChild(precio)
    //cantidad en stock
    let cantstokc = document.createElement("h6")
    cantstokc.innerText = i.cantstokc;
    container.appendChild(cantstokc)

    card.appendChild(container);
    document.getElementById("products").appendChild(card);

}

//parámetro desde el botón (parámetro igual que categoría)

function filterProduct(value){
    //codigo de boton
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        //comprobar si el valor es igual al inerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        }
        else{
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => { 
        //mostrar todas las tarjetas al hacer clic en el botón 'all'
        if (value == "all") {
            element.classList.remove("hide");
        } else { 
            //verificar si el elemento contiene una clase de categoría
            if (element.classList.contains(value)) {
                //
                element.classList.remove("hide");
            } else {
                //ocultar otros elementos
                element.classList.add("hide");
            }
        }

    });
}

// Boton Buscar 
document.getElementById("search").addEventListener("click", () =>{
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    

    elements.forEach((element, index)=>{
        if (element.innerText.includes(searchInput.toUpperCase())){
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide")
        }
    });

});

//mostrar inicialmente todos los productos

window.onload = () => {
    filterProduct("");
}

// carrusel 

let imagenes = [
    {
        "url": "../IMG/Captura 1.jpg",
        "nombre": "Comics y Mangas",
        "descripcion": "En Pocos dias llegaran nuevos volumenes de tus Comics y Mangas favoritos"

    },
    {
        "url": "../IMG/Captura 2.jpg",
        "nombre": "Nuevos productos de coleccion",
        "descripcion": "si eres coleccioniste de seguro te encantaran nuestros nuevos funko pop"

    },
    {
        "url": "../IMG/Captura 3.jpg",
        "nombre": "ALBUM X 50 SOBRES SPIDERMAN 60th ANNIVERSARY",
        "descripcion": "La nueva colección de stickers y tarjetas de Spider Man llega a Panini para celebrar 60 años de su trayectoria en el universo de los cómics."

    },
]


let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto')
let actual = 0
posicionCarrusel()

atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1){
        actual = imagenes.length - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  
adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenes.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (var i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class="bold">.<p>'
        }
        else{
            puntos.innerHTML += '<p>.<p>'
        }
    } 
}


// Dark Mode

const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');
});