let botonIniciar = document.querySelector('#boton-iniciar');
let botonAgregar = document.querySelector('#boton-nueva-palabra');
let botonCancelar = document.querySelector('#boton-cancelar');
let botonDesistir = document.querySelector('#desistr');
let input = document.querySelector('#input');
let botonGuardar = document.querySelector('#boton-guardar');
let botonVolverJugar = document.querySelector('#volver-jugar');
let span = document.querySelector('#letra-erronea');
let botonReintentar = document.querySelector('#boton-perdiste');
let letraCorrecta = document.querySelector('#letra-correcta');
let listaPalabras = ['CASA', 'PANTALLA', 'JUEGO', 'ALURA', 'CSS', 'NUMEROS', 'IMAGEN', 'CARRO', 'HTML', 'TELEFONO'];

//**=========funciones de los botones ======== */

function pantAgregarPalabra() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-ingresar-palabra").style.display = "flex";/**estilo css   */
}

function cancelar() {
    document.getElementById("pantalla-ingresar-palabra").style.display = "none";
    document.getElementById("pantalla-inicio").style.display = "flex";
}
botonAgregar.onclick = pantAgregarPalabra;
botonCancelar.onclick = cancelar;

function desistir() {
    document.getElementById("pantalla-inicio").style.display = "flex";
    document.getElementById("pantalla-juego").style.display = "none";
}
botonDesistir.onclick = desistir;

function guardarPalabra() {
    if ((input.value.match(/^[A-Z ]+$/)) && (input.value != '')) {
        listaPalabras.push(input.value);
        comenzarJuego()
        document.getElementById("pantalla-ingresar-palabra").style.display = "none";
        document.getElementById("pantalla-juego").style.display = "flex";        
    }
    else {
        alert('Ingresar solo palabras en mayúsculas.');
    }
}
botonGuardar.onclick = guardarPalabra;

function reintentar() {
    document.getElementById("pantalla-resultado").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "flex";
    comenzarJuego()
}
botonReintentar.onclick = reintentar; 

// ===== P A N T A L L A === D E === J U E G O =====/////

let palabra;
function generarPalabra(){
    palabra = listaPalabras[Math.round(Math.random()*(listaPalabras.length-1))]
}

let pantalla = document.getElementById("canvas");
let lapiz = pantalla.getContext("2d");
lapiz.font="bold 30px arial";

let errores = 0
let letraEncontrada = []

// FUNCION QUE EJECUTA EL JUEGO
function comenzarJuego() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "flex";

    generarPalabra()

    lapiz.clearRect(0, 0, 600, 600);
    lapiz.beginPath();
    lapiz.fillStyle="black";
    span.textContent = '';
    errores = 0;
    letraEncontrada = []
    encontrado = false;

    for(let i = 0; i < palabra.length; i++){
        lapiz.fillText('_', (i+7.50)*30, 520);   
    }

    encontrarPalabra();
}

// FUNCION PARA DIBUJAR LAS LETRAS 
function encontrarPalabra() {
    window.addEventListener("keydown", function (event) {
        for(let i = 0; i < palabra.length; i++) {
            if(palabra[i] === event.key){
                lapiz.fillText(event.key, (i+7.50)*30, 520);

            }
            else if(span.textContent.includes(event.key) === false){
                if((event.key.match(/^[A-Z ]+$/)) && (!palabra.includes(event.key))){
                    span.textContent += event.key;
                    errores++
                    dibujoAhorcado(errores);
                }
            }                              
        }   
    }) 
}
//FUNCION PARA DETECTAR LETRAS CORRECTAS
window.addEventListener("keydown", function (event) {
    let encontrado = false;
    if(letraEncontrada.length != 0){
        for(let i = 0; i < letraEncontrada.length; i++){
            if(event.key === letraEncontrada[i]){
                encontrado = true;
            }
        }
    }
    if(encontrado === false){
        for(let i = 0; i < palabra.length; i++){
            if(event.key === palabra[i]){
                encontrado = true;
                letraEncontrada.push(event.key);
                if(letraEncontrada.length === palabra.length){
                    lapiz.fillStyle="green";
                    document.getElementById("pantalla-juego").style.display = "none";   
                    document.getElementById("victoria").style.display = "flex"
                }
            }
        }
    }
}) 

// DIBUJO DEL AHORCADO
function dibujoAhorcado(errores) {
    switch (errores) {
        case 1:
            lapiz.moveTo(500, 400);
            lapiz.lineTo(100, 400);
            lapiz.stroke();
            break;
        case 2:
            lapiz.moveTo(220, 400);
            lapiz.lineTo(220, 100);
            lapiz.stroke();
            break;
        case 3:
            lapiz.moveTo(220, 100);
            lapiz.lineTo(400, 100);
            lapiz.stroke();
            break;
        case 4:
            lapiz.moveTo(400, 100);
            lapiz.lineTo(400, 150);
            lapiz.stroke();
            break;
        case 5:
            lapiz.beginPath();
            lapiz.arc(400, 180, 30, 0, 2 * Math.PI);
            lapiz.stroke();   
            break;
        case 6:
            lapiz.moveTo(400, 210);
            lapiz.lineTo(400, 300);
            lapiz.stroke(); 
            break;
        case 7:
            lapiz.moveTo(400, 210);
            lapiz.lineTo(350, 250);
            lapiz.stroke();
            break;
        case 8:
            lapiz.moveTo(400, 210);
            lapiz.lineTo(450, 250);
            lapiz.stroke();
            break;
        case 9:
            lapiz.moveTo(400, 300);
            lapiz.lineTo(450, 350);
            lapiz.stroke(); 
            break;
        case 10:
            lapiz.moveTo(400, 300);
            lapiz.lineTo(350, 350);
            lapiz.stroke();
            
            document.getElementById("pantalla-juego").style.display = "none";        
            document.getElementById("derrota").style.display = "flex";        
            break;
    }
}

botonIniciar.onclick = comenzarJuego;
botonVolverJugar.onclick = comenzarJuego;

function resultadoVolver(){
    document.getElementById("pantalla-juego").style.display = "flex";        
    document.getElementById("derrota").style.display = "none";
    if(document.getElementById("victoria").style.display = "flex"){
        document.getElementById("victoria").style.display = "none"
    }
    comenzarJuego()      
}

document.querySelector('#boton-derrota').onclick = resultadoVolver;
document.querySelector('#boton-victoria').onclick = resultadoVolver;



