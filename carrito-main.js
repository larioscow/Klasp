
let inpNumber = Array.from(document.querySelectorAll('.inpNum'))
let menos = Array.from(document.querySelectorAll('.fa-minus')) 
let mas = Array.from(document.querySelectorAll('.fa-plus'))
let articuloBuscado = Array.from(document.querySelectorAll('.mas-buscados__item'))
let boton = Array.from(document.querySelectorAll('.agregar-al-carrito'))
let imagen = Array.from(document.querySelectorAll('.producto_imagen'))
let p = Array.from(document.querySelectorAll('.producto_p'))
let precio = Array.from(document.querySelectorAll('.precio'))
let menu = document.getElementById('cart-items-container')
let subtotal = document.getElementById('subtotal')
let subcaja = document.getElementById('subcaja') 
let empty = document.getElementById('empty') 
let cara = document.getElementById('cara') 

window.addEventListener('load', function(){
  inpNumber.forEach(input =>{
    if(input.value === ''){
      input.value = '1';
    }
  })
  menuDesplegable.classList.remove('cart-show-animation')
    setTimeout(() => {
        menuDesplegable.classList.remove('cart-show')
    }, 10);
    setTimeout(() => {
        menuDesplegable.classList.remove('cart-display-initial')
        menuDesplegable.classList.add('cart-display-none')
    }, 20);
    body.style.overflow = 'initial';
})



close.addEventListener("click", function() {
  loginPopup.classList.remove("show");
})


//Setear minimo de 1 y maximo de 9 para inputs
function inpNum(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
}

inpNumber.forEach(input =>{

  input.addEventListener('keypress',function(){
    inpNum(event)
  })

  input.addEventListener('blur', function(){
    if(Number(input.value) > 9){
      input.value = '9'
    }
    if(Number(input.value) == false){
      input.value = '1'
    }
  })
})

function sumar(target){
  valor = Number(target.value) 
  if(target.value < 9){target.value = String(valor += 1)}
}
function restar(target){
  valor = Number(target.value) 
  if(target.value > 1){target.value = String(valor -= 1)}
}

mas.forEach(element =>{
  element.addEventListener('click',function(){
    posicion = mas.indexOf(element)
    sumar(inpNumber[posicion])
  })
})

menos.forEach(element =>{
  element.addEventListener('click',function(){
    posicion = menos.indexOf(element)
    restar(inpNumber[posicion])
  })
})

boton.forEach(element =>{
  element.addEventListener('click', function(){
    posicion = boton.indexOf(element)
    normalizarValores(imagen[posicion],p[posicion],precio[posicion],inpNumber[posicion].value)
    storeCart()
  })
})

function calcularCantidad(articuloParrafo){
  articuloBuscado.forEach(articulo =>{
    if(articulo.innerHTML.includes(articuloParrafo)){
      input = inpNumber[articuloBuscado.indexOf(articulo)]
    }
  })
  return input.value
}
function calcularPrecioDeEntrada(articuloParrafo){
  articuloBuscado.forEach(articulo =>{
    if(articulo.innerHTML.includes(articuloParrafo)){
      precioentrante = precio[articuloBuscado.indexOf(articulo)]
    }
  })
  return precioentrante
}
function obtenerPrecio(precio,valor){
  let expReg = /\d*\.\d\d/
  precioarr = Number(expReg.exec(precio)) * Number(valor)
  preciototal = String(precioarr.toFixed(2)) 
  return preciototal
}
function obtenerPrecioRepetido(precio,valor){
  let expReg = /\d*\.\d\d/
  precioarr = Number(expReg.exec(precio.outerHTML)) * Number(valor)
  
  preciototal = String(precioarr.toFixed(2)) 
  return preciototal
}

function normalizarValores(img,p,precio,valor){
  img = img.outerHTML
  p = p.outerHTML
  precioOriginal = precio.innerHTML.split('$')
  precioOriginal = precioOriginal[1]
  obtenerPrecio(precio.outerHTML,valor)
  anadirCarrito(img,p,preciototal,valor,precioOriginal)
}

function obtenerSubtotal(){
  let expReg = /\d*\.\d\d/
  consentracion = menu.innerHTML.split('<!--Separacion-->')
  subtotalarr = []
  i=0;
  x=0;

  consentracion.forEach(item =>{{
    if(i >0){
      subtotalarr = expReg.exec(item)
      x += Number(subtotalarr[0])
      subtotal.innerText = String(x.toFixed(2))
    }
    i++;
  }}
  )
}

function anadirCarrito(img,p,precio,valor,precioOG){ 
if(!String(menu.innerHTML).includes(p)){
    cart.push({imagen: img, articulo: p, precio: precio, valor: valor, precioOG: precioOG})
    anadir(cart)
  }
  else{
    update(p,calcularCantidad(p),calcularPrecioDeEntrada(p))
  }
  obtenerSubtotal()
}

function eliminarItem(articulo){
  contenido = menu.innerHTML.split('<!--Separacion-->')
  contenido.forEach(item =>{
    if(item.includes(articulo)){
      contenido.splice(contenido.indexOf(item), 1)
    }
  })
}

function anadir(carrito){
carrito.forEach(object =>{
  if(!String(menu.innerHTML).includes(object.articulo)){
    contenido =
`
<!--Separacion-->
<div class="carrito_item">
${object.imagen}
<div class="info">
${object.articulo}
<span class="precio precioCart">${object.precio}</span>
<div class="cantidad">
<i class="fa-solid fa-minus svg menos menos-cart"></i>
<form>
<input type="number" value="${object.valor}" class="inpNumCart"/>
</form>
<i class="fa-solid fa-plus svg mas mas-cart"></i>
</div>
</div>
</div>`  
    menu.innerHTML += contenido} 
  })
}

function update(articulo,cantidadDeEntrada,precioDeEntrada){
  cart.forEach(object =>{
    if(String(object.articulo).includes(articulo)){
      eliminarItem(articulo)
      if(Number(object.valor) + Number(cantidadDeEntrada) > 50){object.valor = '50'; object.precio = Number(object.precioOG) * 50; object.precio = String(object.precio.toFixed(2))}
      else{
      object.valor = String(Number(object.valor) + Number(cantidadDeEntrada))
      object.precio = obtenerPrecioRepetido(precioDeEntrada,object.valor) 
      }  
      update()
      definir()
      obtenerSubtotal()
    }}
    )
  menu.innerHTML = ' '
  cart.forEach(object =>{
  contenido =
  `
  <!--Separacion-->
  <div class="carrito_item">
  ${object.imagen}
  <div class="info">
  ${object.articulo}
  <span class="precio precioCart">${object.precio}</span>
  <div class="cantidad">
  <i class="fa-solid fa-minus svg menos menos-cart"></i>
  <form>
  <input type="number" value="${object.valor}" class="inpNumCart"/>
  </form>
  <i class="fa-solid fa-plus svg mas mas-cart"></i>
  </div>
  </div>
  </div>`  
    menu.innerHTML += contenido
  })
  }
  
// INTERACCION IN CART

cartInpNum = Array.from(document.querySelectorAll('.inpNumCart'))
menosCart = Array.from(document.querySelectorAll('.menos-cart'))
masCart = Array.from(document.querySelectorAll('.mas-cart'))

function sumarCart(target, index){
  valor = Number(target.value) 
  if(target.value < 50){
    cart[index].valor = String(Number(cart[index].valor) + 1) 
    cart[index].precio = String(Number(cart[index].precio) + Number(cart[index].precioOG))
    cart[index].precio = String(Number(cart[index].precio).toFixed(2))
    update()
    definir()
    obtenerSubtotal()
    storeCart()
  }
}

function restarCart(target, index){
  valor = Number(target.value) 
  if(target.value > 0){
    cart[index].valor = String(Number(cart[index].valor) - 1)
    cart[index].precio = String(Number(cart[index].precio) - Number(cart[index].precioOG))
    cart[index].precio = String(Number(cart[index].precio).toFixed(2))
    update()
    definir()
    obtenerSubtotal()
    storeCart()

  }
}

function cartInpNumCalcular(index,valor){
  if(Number(valor) > 50){
    cart[index].valor = '50';
    cartInpNum[index].value = '50'
    cart[index].precio = Number(cart[index].precioOG * 50)
    cart[index].precio = String(cart[index].precio.toFixed(2)) 
  }
  else{
  cart[index].valor = Number(valor)
  cart[index].precio = Number(valor) * Number(cart[index].precioOG)
  cart[index].precio = String(cart[index].precio.toFixed(2))}
  update()
  definir()
  obtenerSubtotal()
  storeCart()

}

function rm(posicion){ 
  cart.splice(posicion, 1)
  menu.innerHTML = ' '
  cart.forEach(object =>{
  contenido =
  `
  <!--Separacion-->
  <div class="carrito_item">
  ${object.imagen}
  <div class="info">
  ${object.articulo}
  <span class="precio precioCart">${object.precio}</span>
  <div class="cantidad">
  <i class="fa-solid fa-minus svg menos menos-cart"></i>
  <form>
  <input type="number" value="${object.valor}" class="inpNumCart"/>
  </form>
  <i class="fa-solid fa-plus svg mas mas-cart"></i>
  </div>
  </div>
  </div>`  
    menu.innerHTML += contenido
  })
}

function remover(item){
  if(Number(item.value) == false){
    item.value = '1';
  }
}

function removerMenos(item){
  posicion = menosCart.indexOf(item)
  if(cartInpNum[posicion].value - 1 == 0){
    rm(posicion)
    definir()
  }
  obtenerSubtotal()
  storeCart()
  vacio()
}

function definir(){
  cartInpNum = Array.from(document.querySelectorAll('.inpNumCart'))
  menosCart = Array.from(document.querySelectorAll('.menos-cart'))
  masCart = Array.from(document.querySelectorAll('.mas-cart'))

  cartInpNum.forEach(item =>{
    item.addEventListener('keypress',function(){
      inpNum(event)
    })
    
    item.addEventListener('blur', function(){
      remover(item)
      inpNumPosicion = cartInpNum.indexOf(item)
      cartInpNumCalcular(inpNumPosicion,item.value)
    })
  })

  menosCart.forEach(item =>{
    item.addEventListener('click',function(){
      removerMenos(item)
    })
  })

  masCart.forEach(element =>{
    element.addEventListener('click',function(){
      posicion = masCart.indexOf(element)
      sumarCart(cartInpNum[posicion], posicion)
    })
  })
  
  menosCart.forEach(element =>{
    element.addEventListener('click',function(){
      posicion = menosCart.indexOf(element)
      restarCart(cartInpNum[posicion], posicion)
    })
  })
}

cartlogo.addEventListener('click',function(){
  definir()
})

