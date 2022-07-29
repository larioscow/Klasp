let contenedor = document.getElementById('contenedor-de-productos')
let productos =
[
  {
    nombre:'Pila Alcalina (AA) Tira con 12 Piezas Energizer',
    precio: 11,
    //----------
    cantidad:'',
  },
  {
    nombre:'Conector Hub USB con 4 Puertos Negro Green Leaf',
    precio: 54.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Mini Lector Tarjeta Micro SD Green Leaf',
    precio:13.3,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cable Vga de 2 m Negro Vorago',
    precio:93.8,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cable Auxiliar de Audio 3.5 mm de 80 cm Negro True Basix',
    precio:43.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Kit Cargador USB  Micro USB Para Auto Negro Green Leaf',
    precio:85.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cargador para Pared USB Negro Green Leaf',
    precio:73.1,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cargador para Pared con Cable Lightning para iPhone Blanco 1 Hora',
    precio:91.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Control Remoto Universal para 4 Equipos para Pantallas Smart',
    precio:95.9,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cautín Tipo Lápiz de 40 W Bork 15-2085',
    precio:76.5,
    //----------
    cantidad:'',
  },
  {
    nombre:'Pila Botón Litio 2032 Blíster con 2 Piezas Energizer',
    precio:79.1,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cable USB a Micro USB Rojo Green Leaf',
    precio:22.5,
    //----------
    cantidad:'',
  }
]

productos.forEach(producto =>{
  contenedor.innerHTML += 
  `
  <div class="productos">
        <picture>
          <img src="/categorias/img/mobil/${producto.nombre}.webp" alt="${producto.nombre}">
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
    pImg = `<img src="/categorias/img/mobil/${productos[pIndex].nombre}.webp" alt="${productos[pIndex].nombre}" class="producto_imagen">`
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