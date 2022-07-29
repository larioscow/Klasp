let categorias = document.getElementById('categorias')

let element1 ='<a href="categorias/gamer.html" class="categorias__element" id="element1"><div><figure class="categorias-img"><img src="../Img/gaming.png " alt="gaming " /><figcaption>Gamer</figcaption></figure></div></a>';
let element2 ='<a href="categorias/computo.html" class="categorias__element" id="element2"><div><figure class="categorias-img"><img src="../Img/computo.png " alt="computo " /><figcaption>Cómputo</figcaption></figure></div></a>';
let element3 ='<a href="categorias/escritura.html" class="categorias__element" id="element3"><div><figure class="categorias-img"><img src="../Img/escritura.png " alt="escritura " /><figcaption>Escritura</figcaption></figure></div></a>';
let element4 ='<a href="categorias/mobil.html" class="categorias__element" id="element4"><div><figure class="categorias-img"><img src="../Img/Telefonos.png " alt="telefonos y accesorios" /><figcaption>Telefonos y accesorios</figcaption></figure></div></a>';


//ITEMS SLIDER
j = 0;
function calcularCategorias(){
    function definirPosiciones(distribucion){
        categorias.innerHTML = `${distribucion[0]}${distribucion[1]}${distribucion[2]}${distribucion[3]}`;
        let elementoOculto = String(distribucion[3]);
        if(elementoOculto.search('element1') !== -1){document.getElementById('element1').classList.add('hidden')}
        else if(elementoOculto.search('element2') !== -1){document.getElementById('element2').classList.add('hidden')}
        else if(elementoOculto.search('element3') !== -1){document.getElementById('element3').classList.add('hidden')}
        else if(elementoOculto.search('element4') !== -1){document.getElementById('element4').classList.add('hidden')}
    }
    function transladar(e1,e2,e3){
        if(direccion === 'derecha'){
            e1.classList.add('translate')
            e2.classList.add('translate')
        }
        else if(direccion === 'izquierda'){
            if(j === 0){
                document.getElementById('element4').style.zIndex = ('-100');
                setTimeout(() => {
                    document.getElementById('element4').style.zIndex = ('0');
                }, 25);
            }
            else if(j === 3 || j === -1){
                document.getElementById('element3').style.zIndex = ('-100');
                setTimeout(() => {
                    document.getElementById('element3').style.zIndex = ('0');
                }, 25);
            }
            else if(j === 2 || j === -2){
                document.getElementById('element2').style.zIndex = ('-100');
                setTimeout(() => {
                    document.getElementById('element2').style.zIndex = ('0');
                }, 25);
            }
            else if(j === 1 || j === -3){
                document.getElementById('element1').style.zIndex = ('-100');
                setTimeout(() => {
                    document.getElementById('element1').style.zIndex = ('0');
                }, 25);
            }
            else if(j === 4 || j === -4){
                document.getElementById('element4').style.zIndex = ('-100');
                setTimeout(() => {
                    document.getElementById('element4').style.zIndex = ('0');
                }, 25);
            }
            e2.classList.add('translate2')
            e3.classList.add('translate2')
        }
        else{
            console.info(
            `Ha entrado en el modo escritorio y el slider interactivo se ha activado`)
        }
    }

    function mostrar(el,er){
        if(direccion === 'derecha'){
            er.classList.add('shide')
            setTimeout(() => {
                er.classList.add('show')
            }, 25);
            setTimeout(() => {
                er.classList.remove('shide')
                er.classList.remove('show')
            }, 25);
            
        }
        else if(direccion === 'izquierda'){
            el.classList.add('shide')
            setTimeout(() => {
                el.classList.add('show')
            }, 25);
            setTimeout(() => {
                el.classList.remove('shide')
                el.classList.remove('show')
            }, 25);
        }
    }

    if(j === 0){
        document.getElementById('element4').classList.add('hide');

        setTimeout(() => {
            definirPosiciones([`${element1}`,`${element2}`,`${element3}`,`${element4}`])
        }, 350);
        
        transladar(document.getElementById('element1'),document.getElementById('element2'),document.getElementById('element3'))

        setTimeout(() => {
            mostrar(document.getElementById('element1'),document.getElementById('element3'))
        }, 350);
    }
    else if(j === 1 || j === -3){
        document.getElementById('element1').classList.add('hide');

        setTimeout(() => {
            definirPosiciones([`${element2}`,`${element3}`,`${element4}`,`${element1}`])
        }, 350);
        transladar(document.getElementById('element2'),document.getElementById('element3'),document.getElementById('element4'))

        setTimeout(() => {
            mostrar(document.getElementById('element2'),document.getElementById('element4'))
        }, 350);
    }
    else if(j === 2 || j === -2){
        document.getElementById('element2').classList.add('hide');

        setTimeout(() => {
            definirPosiciones([`${element3}`,`${element4}`,`${element1}`,`${element2}`])
        }, 350);
        transladar(document.getElementById('element3'),document.getElementById('element4'),document.getElementById('element1'))

        setTimeout(() => {
            mostrar(document.getElementById('element3'),document.getElementById('element1'))
        }, 350);
    }
    else if(j === 3 || j === -1){
        document.getElementById('element3').classList.add('hide');

        setTimeout(() => {
            definirPosiciones([`${element4}`,`${element1}`,`${element2}`,`${element3}`])
        }, 350);
        transladar(document.getElementById('element4'),document.getElementById('element1'),document.getElementById('element2'))

        setTimeout(() => {
            mostrar(document.getElementById('element4'),document.getElementById('element2'))
        }, 350);
    }
    else if(j === 4 || j === -4){
        document.getElementById('element4').classList.add('hide');

        setTimeout(() => {
            definirPosiciones([`${element1}`,`${element2}`,`${element3}`,`${element4}`])
        }, 350);
        transladar(document.getElementById('element1'),document.getElementById('element2'),document.getElementById('element3'))

        setTimeout(() => {
            mostrar(document.getElementById('element1'),document.getElementById('element3'))
        }, 350);
        j=0;
    }
}

//Permitir click cada cierto tiempo
function amIAllowed(){
    if(vez === 'primera'){
      allowed = true;
    }
    else{
      setTimeout(() => {
        allowed = true;
      }, 450);
    }
  }
  
  window.addEventListener('load',function(){
    vez = 'primera';
    amIAllowed()
  })
  
  
  
  RightArrow.addEventListener('click',function(){
    if(allowed){
        j ++;
        direccion = 'derecha'
        calcularCategorias()  
        allowed = false;
        vez = false;
        amIAllowed();
      }
  })

  LeftArrow.addEventListener('click',function(){
    if(allowed){
        j --;
        direccion = 'izquierda'
        calcularCategorias()  
        allowed = false;
        vez = false;
        amIAllowed();
      }
  })


window.addEventListener("load", function sldier() {
    showPopup();
    if(this.window.innerWidth >= 1200){
        categorias.innerHTML = `${element1}${element2}${element3}`
    }
    else{
        categorias.innerHTML = `${element1}${element2}${element3}${element4}`
    }
})
window.addEventListener("resize",function(){
    direccion = undefined
    if(this.window.innerWidth >= 1200){
        categorias.innerHTML = `${element1}${element2}${element3}${element4}`
        calcularCategorias()
    }
    else{
        categorias.innerHTML = `${element1}${element2}${element3}${element4}`
    }
})

//================================================


