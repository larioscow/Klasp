let contenedor = document.getElementById('contenedor-de-productos')
let productos =
[
  {
    nombre:'Bolígrafo Punto Mediano Stick Azul Caja con 12 Piezas Le Plume',
    precio: 35,
    //----------
    cantidad:'',
  },
  {
    nombre:'Marcador Para Pizarrón Negro Blíster Grip Magistral',
    precio: 28.7,
    //----------
    cantidad:'',
  },
  {
    nombre:'Bolígrafo Punto Fino Stick Rojo Caja con 12 Piezas Pin Point',
    precio:48,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lápiz Bicolor Triangular Blíster con 3 Piezas Norma',
    precio:37.2,
    //----------
    cantidad:'',
  },
  {
    nombre:'Gis Colores Surtidos Caja con 12 Piezas Baco',
    precio:13.3,
    //----------
    cantidad:'',
  },
  {
    nombre:'Bolígrafo Punto Fino Stick Colores Surtidos Bolsa con 3 Piezas Pin Point',
    precio:16.3,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lápiz Bicolor Hexagonal Caja con 12 Piezas Verithin',
    precio:85.5,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lápiz con Goma Hexagonal Número 2 Bolsa con 4 Piezas Smart Plus',
    precio:14.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Marcador para Pizarrón Grueso Colores Surtidos Blíster con 4 Piezas',
    precio:94,
    //----------
    cantidad:'',
  },
  {
    nombre:'Gis Blanco Caja con 50 Piezas Baco',
    precio:27.2,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lápiz Bicolor Hexagonal Blíster con 4 Piezas Verithin',
    precio:34,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lápiz con Goma Número 2 Triangular con 36 Piezas Black Peps Maped',
    precio:131,
    //----------
    cantidad:'',
  }
]

productos.forEach(producto =>{
  contenedor.innerHTML += 
  `
  <div class="productos">
        <picture>
          <img src="/categorias/img/escritura/${producto.nombre}.webp" alt="${producto.nombre}">
        </picture>
        <span class="nombre-producto">${producto.nombre}</span>
        <span class="precio">$${producto.precio.toFixed(2)}</span>
        <div class="cantidad">
          <i class="fa-solid fa-minus menos"></i>
          <form>
              <input type="number" id="inpNum1" value="1"  class="inpNum"/>
          </form>
          <i class="fa-solid fa-plus mas"></i>
        </div>
        <button class="pButton">Añadir al carrito</button>
      </div>
  `;
  
})

let pButton = Array.from(document.querySelectorAll('.pButton'))
let pInpNum = Array.from(document.querySelectorAll('.inpNum'))

function modify(pImg,pArt,pPre,pVal,pPOG){
  if(!String(menu.innerHTML).includes(pArt)){
    cart.push({imagen: pImg, articulo: pArt, precio: pPre, valor: pVal, precioOG: pPOG})
  }
  else{
    cart.forEach(item=>{
      if(item.articulo === pArt){
        if(Number(item.valor) + Number(pVal) > 50){
          item.valor = '50'
        }else{
          item.valor = Number(item.valor) + Number(pVal)
        }
        item.precio = pPOG * item.valor;
        item.valor = String(item.valor)
        item.precio = String(item.precio.toFixed(2))
        item.precioOG = String(pPOG);
      }
    })
  }
}

pButton.forEach(button => {
  button.addEventListener('click', function(){
    pIndex = pButton.indexOf(button);

    productos[pIndex].cantidad = pInpNum[pIndex].value
    pImg = `<img src="/categorias/img/escritura/${productos[pIndex].nombre}.webp" alt="${productos[pIndex].nombre}" class="producto_imagen">`
    pArt = `<p id=\"p3\" class=\"producto_p\">${productos[pIndex].nombre}</p>`;
    pPre = productos[pIndex].precio * Number(productos[pIndex].cantidad);
    pPre = String(pPre.toFixed(2))
    pVal = pInpNum[pIndex].value
    pPOG = String(productos[pIndex].precio.toFixed(2))

    modify(pImg,pArt,pPre,pVal,pPOG)
    update()
    definir()
    obtenerSubtotal()
    storeCart()
    vacio()
  })
})