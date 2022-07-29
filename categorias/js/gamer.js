let contenedor = document.getElementById('contenedor-de-productos')
let productos =
[
  {
    nombre:'Teclado y Ratón Gamer Español RGB, Mouse Gamer hasta 2400DPI, Mousepad Gaming, Kit de Teclado Luz de Retroiluminación RGB de 104 Teclas',
    precio: 399,
    //----------
    cantidad:'',
  },
  {
    nombre:'OCELOT GAMING OGEC01 - Gabinete, Factor de Forma ATX, Micro ATX y Mini ITX, Panel de Cristal Templado Frontal y Lateral, sin Fuente de Poder',
    precio:699,
    //----------
    cantidad:'',
  },
  {
    nombre:'Kit De Teclado Y Mouse Alambrico Usb Luz Rgb Led Para Pc Lap',
    precio:299,
    //----------
    cantidad:'',
  },
  {
    nombre:'KEDIERS Gabinete PC ATX Gaming Torre de Vidrio Templado para Juegos PC de Marco Abierto con 7 Ventiladores RGB, C570 (Rojo)',
    precio:3600,
    //----------
    cantidad:'',
  },
  {
    nombre:'YEYIAN Gaming PC Case Armageddon 2200, Full Tower, ATX, RGB Lights,Double LED Ring, 3 Fans, Light Controller Metal Dust Filter (YGA-68809)',
    precio:2600,
    //----------
    cantidad:'',
  },
  {
    nombre:'HyperX QuadCast Micrófono USB Condensador para Gaming y Streaming, compatible con PC, PS4 y Mac, Montura Antivibraciones, Pop Filter, Cuatro patrones polares, Podcasts, YouTube',
    precio:2300,
    //----------
    cantidad:'',
  },
  {
    nombre:'Setup Silla Gamer Escritorio Led Mousepad Rgb Teclado Mouse',
    precio:700,
    //----------
    cantidad:'',
  },
  {
    nombre:'Cougar Conquer 2 - Funda de Torre Completa para Juegos con diseño Exclusivo de subchasis Desmontable',
    precio:7600,
    //----------
    cantidad:'',
  },
  {
    nombre:'Teclado Mouse Gamer Luz Rgb Iluminado Led Usb Alambrico',
    precio:780,
    //----------
    cantidad:'',
  },
  {
    nombre:'Kit Gamer Vortred Avalanche Teclado con iluminación LED Mouse Vortred V-930457',
    precio:580,
    //----------
    cantidad:'',
  },
  {
    nombre:'Kit De Teclado & Muse Gaming Set Aoas Iluminado M-300 Usb',
    precio: 220,
    //----------
    cantidad:'',
  },
  {
    nombre:'Escritorio Gamer En L Ice K Dual Rgb Computadora Oficina',
    precio:8790,
    //----------
    cantidad:'',
  }
]

productos.forEach(producto =>{
  contenedor.innerHTML += 
  `
  <div class="productos">
        <picture>
          <img src="/categorias/img/gamer/${producto.nombre}.jpeg" alt="${producto.nombre}">
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
    pImg = `<img src="/categorias/img/gamer/${productos[pIndex].nombre}.jpeg" alt="${productos[pIndex].nombre}" class="producto_imagen">`
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