//LOGIN POP UP
const loginPopup = document.querySelector(".login-popup");
let close = document.querySelector(".close");
const sucursal = document.getElementById("sucursal")
let domicilio = document.getElementById("domicilio")
ub.innerText = localStorage.getItem('lugar')
ubmobiletext.innerText = localStorage.getItem('lugar')
let ubsvg = document.getElementById("ubisvg")
let cpinput = document.getElementById("cpinput")
let entrega = document.getElementById("entrega")
let codigomsg = document.getElementById("codigomsg")
let ubmobile = document.getElementById("ubmobile")
let mayoreo = document.getElementById('mayoreo')
let menudeo = document.getElementById('menudeo')
const body = document.getElementById('body')
let cartlogo = document.getElementById('cart-logo')
let cartleft = document.getElementById('cart-left')
let menuDesplegable = document.getElementById('cartpop')
const RightArrow = document.getElementById('derecha')
const LeftArrow = document.getElementById('izquierda')
let fakem = document.getElementById('fake-menudeo')
let mayoflecha = document.getElementById('extraarrow')

let cart = JSON.parse(localStorage.getItem("CartData"))

if(cart == null){
    cart = []
}else{
    cart = JSON.parse(localStorage.getItem("CartData"));
}

const codigos = 
[
  {colonia: "Zamora Centro", codigo: 59600},
  {colonia: "Valencia", codigo: 59610},
  {colonia: "Arboledas", codigo: 59698},
  {colonia: "Kuntani", codigo: 59635},
  {colonia: "Acanto", codigo: 59640},
  {colonia: "El Duero", codigo: 59690},
  {colonia: "20 de Noviembre", codigo: 59660},
  {colonia: "Hola midu", codigo: 69420},
]
 
function storeCart(){
    localStorage.setItem("CartData", JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem("CartData"));
}


//Prevenir caracteres en input type number en FireFox
function inpNum(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/))
        e.preventDefault();
}

//POP UP
function showPopup() {
    if(ub.innerText === ""){    
        const timeLimit = 1 // seconds;
        let i = 0;
        const timer = setInterval(function() {
            i++;
            if (i == timeLimit) {
                clearInterval(timer);
                loginPopup.classList.add("show");
            }
            console.log(i)
        }, 1000);
    }
}



sucursal.addEventListener("click", function() {
    loginPopup.classList.remove("show");
    localStorage.setItem('lugar','Recoger en sucursal');
    ub.innerText = localStorage.getItem('lugar')
    ubmobiletext.innerText = localStorage.getItem('lugar')
})

//USAR PROXIMAMENTE PARA  LA SECCION DE CUENTA
/*Cuando se presione en modo de entrega se realizara esta funcion
si el modo de entrega no se sabe se debe obtener 
si ya se sabe se debe desplegar una tabla de informacion de los demás datos
al llenarse la tabla y enviarse deben almacenarse los datos localmente
*/


function datosDeEntrega(zona){
    if(zona === ""){
        loginPopup.classList.add("show");
    }
    else{
        //Datos que ya se conocen
        codigos.forEach(element => {
            if(zona === element.colonia){
                console.log(`Colonia: ${element.colonia}`)
                console.log(`Código Postal: ${element.codigo}`)
            }
        });
        console.log("Calle: ")
        console.log("Numero: ")
        console.log("Referencia: ")
    }
}

ub.addEventListener("click", function(){
    loginPopup.classList.add("show");
})

ubsvg.addEventListener("click", function(){
    loginPopup.classList.add("show");
})
ubmobile.addEventListener("click", function(){
    loginPopup.classList.add("show");
})

function warningMsg(msg){
    if(codigomsg.classList.contains("showmsg")){
        codigomsg.innerHTML = `<i class="fi fi-rs-engine-warning"></i><p>${msg}</p>`;     
    }
    else{
        codigomsg.classList.add("showmsg");
        codigomsg.innerHTML = `<i class="fi fi-rs-engine-warning"></i><p>${msg}</p>`;     

    }
}

domicilio.addEventListener("click", function(){
    domicilio.classList.add("domicilioshow");
    domicilio.innerHTML = ('<i class="fi fi-rr-arrow-right" id="submitcp"></i>');
    document.getElementById("submitcp").classList.add("showsubmitcp");
    cpinput.classList.add("showcpinput")
    entrega.classList.add("after")
    document.getElementById("submitcp").addEventListener("click", function(){
        if(String(cpinput.value).length === 5){
            let found;
            codigos.forEach(object => {
                if(object.codigo === Number(cpinput.value)){
                    found = true;
                    colonia = object.colonia;
                    localStorage.setItem('lugar',object.colonia);
                    ubmobiletext.innerText = localStorage.getItem('lugar')
                    ub.innerText = localStorage.getItem('lugar')
                    loginPopup.classList.remove('show')
                    codigomsg.classList.remove("showmsg")
                }
            })
            if(found){
                console.info(`El código es válido, la colonia es: ${colonia} `)
            }
            else{warningMsg('Lo sentimos, codigo incorrecto o zona no disponible para envío.')}
        }
        else{warningMsg('El código postal debe tener 5 caracteres de largo.')}
    })
}) 

const deselect = function(){
    menudeo.classList.remove('onselect')
    mayoreo.classList.remove('onselect')
    fakem.classList.remove('display')
    menudeo.removeEventListener('click', deselect)
    mayoflecha.removeEventListener('click', deselect)
}
const select = function(){
    menudeo.classList.add('onselect')
    mayoreo.classList.add('onselect')
    fakem.classList.add('display')
    menudeo.addEventListener('click', deselect)
    fakem.addEventListener('click',deselect)
    mayoflecha.addEventListener('click',deselect)
    mayoreo.addEventListener('click',function(){
        window.location.href = "/mayoreo/mayoreo.html"
    })
}

menudeo.addEventListener('click', select)
mayoflecha.addEventListener('click', select)


//carrito

function vacio(){
    if(cart != false){
      opacity = '100%'
      empty.classList.add('hideface')
      cara.classList.add('hideface')
    }
    if(cart == false){
      opacity = '0%'
      empty.classList.remove('hideface')
      cara.classList.remove('hideface')
    }
    subcaja.style.opacity = opacity
}

cartlogo.addEventListener('click', function(){
    update()
    obtenerSubtotal()
    menuDesplegable.classList.remove('cart-display-none')
    menuDesplegable.classList.add('cart-display-initial')
    setTimeout(() => {
        menuDesplegable.classList.add('cart-show-animation')
    }, 20);
    setTimeout(() => {
        menuDesplegable.classList.add('cart-show')
    }, 270);
    body.style.overflowY = "hidden";
    body.style.overflowX = "hidden";
    vacio()
})



cartleft.addEventListener('click', function(){
    storeCart()
    menuDesplegable.classList.remove('cart-show-animation')
    setTimeout(() => {
        menuDesplegable.classList.remove('cart-show')
    }, 20);
    setTimeout(() => {
        menuDesplegable.classList.remove('cart-display-initial')
        menuDesplegable.classList.add('cart-display-none')
        body.style.overflowY = "initial";
        body.style.overflowX = "initial";
    }, 270);
});
