import {GameController} from './clases/GameController.js'


// Creamos un array para almacenar las coordenadas de las casillas
const casillas = [];
// Rellenamos las casillas con las coordenadas del mapeo de la imagen (áreas)
$('map[name="image-map"] area').each(function () {
    var coords = $(this).attr('coords').split(',');
    casillas.push(coords);
});
// Creamos otros arrays que contienen las posiciones de las casillas especiales
const ocas = [4, 8, 13, 17, 22, 26, 31, 35, 40, 44, 49, 53, 58, 62]
const rerolls = [25, 52]
const bridges = [5, 11]
const death = 57
// Variables para controlar la velocidad de las tiradas y animaciones
var animacioncasilla = 600
var animacioncierre = 200
var tiempoPrimeraAnimacion = 200
var tiempoSegundaAnimacion = 1500
// Variable para capturar los inputs de los formularios de creación. Este array nos permitirá reiniciar la partida con los mismos jugadores
var jugadores = []
// Array que contendrá las instancias de la clase Jugadores y que se recorrerá para hacer las tiradas y traspaso de turnos
var jugadoresArray = []
// Creación del controlador de juego
var controlador = new GameController(casillas,animacioncasilla,animacioncierre,ocas,rerolls,bridges,death,tiempoPrimeraAnimacion,tiempoSegundaAnimacion)

$(document).ready(function () {
    // Dejamos visible solo el div de la creación de jugadores
    $('#wrapper').css("display", "none")
    $('#iniciar').css("display", "flex")
    // Creación de la vista de selección de jugadores
    $('#players-button').click(function () {
        controlador.seleccionJugadores()
    }) 
    //Creación de jugadores en base a los datos proporcionados en la configuración de partida al dar click a "comenzar"
    $('#start-game').click(function (event) {
        // Anulamos el comportamiento por defecto del botón
        event.preventDefault();
        
        //Capturamos los datos
        jugadores = controlador.capturarDatos();

        // Crear jugadores físicamente en el tablero y guardarlos en el array jugadoresArray
        jugadoresArray = controlador.pintarJugadores(jugadores)
        
        $('#wrapper').css('display', 'flex')
        $('#iniciar').css('display', 'none')
        
        // Llamamos al método turnos que se encarga de la lógica de juego
        controlador.turnos(jugadoresArray)        
    }); 
  
    // Controladores de la velocidad de juego
    $('#normal').click(function () {
        controlador.animacioncasilla = 600
        controlador.animacioncierre = 200
        controlador.tiempoPrimeraAnimacion = 200
        controlador.tiempoSegundaAnimacion = 1500
        $('#normal').css("background-color","#ba0a0a")
        $('#fast').css("background-color","#1d1d1d")
        $('#super-fast').css("background-color","#1d1d1d")
    })
    $('#fast').click(function () {
        controlador.animacioncasilla = 600 * 0.5
        controlador.animacioncierre = 200 * 0.5
        controlador.tiempoPrimeraAnimacion = 200 * 0.5
        controlador.tiempoSegundaAnimacion = 1500 * 0.5
        $('#normal').css("background-color","#1d1d1d")
        $('#fast').css("background-color","#ba0a0a")
        $('#super-fast').css("background-color","#1d1d1d")
    })
    $('#super-fast').click(function () {
        controlador.animacioncasilla = 600 * 0.15
        controlador.animacioncierre = 200 * 0.15
        controlador.tiempoPrimeraAnimacion = 200 * 0.15
        controlador.tiempoSegundaAnimacion = 1500 * 0.15
        $('#normal').css("background-color","#1d1d1d")
        $('#fast').css("background-color","#1d1d1d")
        $('#super-fast').css("background-color","#ba0a0a")
    })
    // Reiniciar el juego con los mismos jugadores
    $(document).on('click', '.reiniciar', function(){
        controlador.reiniciar(jugadores)
    });
    
});








