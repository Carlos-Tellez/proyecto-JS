var carritoVisible = false;    //esta variable mantiene el eatado visible del carrito de compras//

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //funcionalidad para los botones eliminar en el carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
}

//Eliminar el Item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    actualizarTotalCarrito();
}

//Actualiza el total del carrito luego de que se elimine un item 
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = document.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i=0; i < carritoItems. length; i++){
        var item = carritoItems [i];
        var precioElemento = item.getElementsByClassName( 'carrito-item-precio') [0];
        console. log(precioElemento) ;
        var precio = parseFloat(precioElemento. innerText. replace('$','').replace('.',''));
        console. log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
        total = Math.round(total*100)/100;
        document.getElementsByClassName( 'carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}
