let contenedor = document.getElementById('contenedor-de-productos')
let productos =
[
  {
    nombre:'Kit De Teclado Y Mouse Alambrico Usb Luz Rgb Led Para Pc Lap',
    precio: 7280,
    //----------
    cantidad:'',
  },
  {
    nombre:'Lenovo V130-20IGM All-in-One 19.5, Intel Celeron J4025 2GHz, 4GB, 1TB, Windows 10 Home 64-bit, Negro + TecladoMouse',
    precio:7230,
    //----------
    cantidad:'',
  },
  {
    nombre:'Optiplex 7780 AIO - Configúrala a tu medida',
    precio:7800,
    //----------
    cantidad:'',
  },
  {
    nombre:'Xtreme PC Intel Core I3 10100 8GB SSD 240GB Monitor 21.5 WiFi RGB',
    precio:6700,
    //----------
    cantidad:'',
  },
  {
    nombre:'Xtreme PC AMD Radeon R2 Dual Core E1 8GB SSD 240GB Monitor 21.5 WIFI XTREME PC GAMING XTEVE18GBR2M',
    precio:5700,
    //----------
    cantidad:'',
  },
  {
    nombre:'SAMSUNG Monitor Odyssey Gaming LC49G95TSSLXZX 49 240Hz Curvatura 1000R, Negro',
    precio:1300,
    //----------
    cantidad:'',
  },
  {
    nombre:'GABINETE GAMER YEYIAN BLADE 2100 VENTANA CRISTAL YNH-B2100 NEDGRO LED AZUL',
    precio:6400,
    //----------
    cantidad:'',
  },
  {
    nombre:'PC Gamer Ryzen 7 Graficos Radeon RX 16GB SSD 240GB y 3TB Xpert Computers',
    precio:3400,
    //----------
    cantidad:'',
  },
  {
    nombre:'Monitor Gamer AOC 27G2 LED 27, Full HD, Widescreen, FreeSync, 144Hz, HDMI, Negro',
    precio:7200,
    //----------
    cantidad:'',
  },
  {
    nombre:'CyberpowerPC Gamer Xtreme VR Gaming PC, Intel Core i5-9400F 2.9GHz',
    precio:5600,
    //----------
    cantidad:'',
  },
  {
    nombre:'All in One HP 22-dd0520la Intel Celeron J4025 4GB RAM 1TB DD',
    precio:6600,
    //----------
    cantidad:'',
  },
  {
    nombre:'Apple iMac Retina 27 pulgadas Intel Core i5 3.30GHz, 8GB, 512GB SSD, Plata (Septiembre - 2020)',
    precio:12600,
    //----------
    cantidad:'',
  }
]

productos.forEach(producto =>{
  contenedor.innerHTML += 
  `
  <div class="productos">
        <picture>
          <img src="/categorias/img/computo/${producto.nombre}.jpeg" alt="${producto.nombre}">
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
    pImg = `<img src="/categorias/img/computo/${productos[pIndex].nombre}.jpeg" alt="${productos[pIndex].nombre}" class="producto_imagen">`
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