import {Dice} from './clases/Dice.js'
import {GameController} from './clases/GameController.js'


// Creamos un array para almacenar las coordenadas de las casillas
const casillas = [];
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
// Variable para capturar los inputs de los formularios de creación
var jugadores = []
// Array que contendrá las instancias de la clase Jugadores
var jugadoresArray = []
// Creación del controlador de juego
var controlador = new GameController(casillas,animacioncasilla,animacioncierre,ocas,rerolls,bridges,death,tiempoPrimeraAnimacion,tiempoSegundaAnimacion)
// Creación de la instancia de clase dado para hacer las tiradas
var dice = new Dice()
//Crear jugadores



$(document).ready(function () {
    // Configuración de inicio de la partida
    $('#wrapper').css("display", "none")
    $('#iniciar').css("display", "flex")
    // Creación de la vista de selección de jugadores
    $('#players-button').click(function () {
        controlador.seleccionJugadores()
    }) 
    //Creación de jugadores en base a los datos proporcionados en la configuración de partida
    $('#start-game').click(function (event) {
        event.preventDefault();
        
        $('.player-edition').each(function () {
            // Verificar si el fieldset padre está oculto para no contarlo
            if (!$(this).closest('fieldset').is(':hidden')) {
                var jugador = {};
                jugador.nombre = $(this).find('.player-name-edit input').val();
                jugador.personajeurl = $(this).find('input[type="radio"]:checked').val();
                jugador.personaje = $(this).find('input[type="radio"]:checked').attr('character');
                jugadores.push(jugador);

            }
        });
        
        // Crear jugadores físicamente en el tablero
        jugadoresArray = controlador.crearJugadores(jugadores)
        
        $('#wrapper').css('display', 'flex')
        $('#iniciar').css('display', 'none')
        
        
        controlador.turnos(jugadoresArray,dice)
        
    });
    


    // Rellenamos las casillas con las coordenadas del mapeo de la imagen (áreas)
    $('map[name="image-map"] area').each(function () {
        var coords = $(this).attr('coords').split(',');
        casillas.push(coords);
    });
 
  
    // Controladores de la velocidad de juego
    $('#normal').click(function () {
        controlador.animacioncasilla = 600
        controlador.animacioncierre = 200
        controlador.tiempoPrimeraAnimacion = 200
        controlador.tiempoSegundaAnimacion = 1500
    })
    $('#fast').click(function () {
        controlador.animacioncasilla = 600 * 0.5
        controlador.animacioncierre = 200 * 0.5
        controlador.tiempoPrimeraAnimacion = 200 * 0.5
        controlador.tiempoSegundaAnimacion = 1500 * 0.5
    })
    $('#super-fast').click(function () {
        controlador.animacioncasilla = 600 * 0.15
        controlador.animacioncierre = 200 * 0.15
        controlador.tiempoPrimeraAnimacion = 200 * 0.15
        controlador.tiempoSegundaAnimacion = 1500 * 0.15
    })
    // Reiniciar el juego
    $('.reiniciar').click(function(){
        controlador.reiniciar(jugadores)
    })
    
});








