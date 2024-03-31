


// Creamos una clase dado e creamos una instancia para poder usarlo
class Dice {
    roll() {
        var result = Math.floor(Math.random() * 6) + 1;
        return result;
    }
}

// class GameController {

//     constructor(){
//         // Creamos una instancia de clase Dice para crear un dado
//         var dice = new Dice();

//     }

//        createPlayers(){

//}

//     checkPosition(){

//     }

//     rollDice(){
//         dice.roll()
//     }
// }




$(document).ready(function () {
    // Iniciar de la partida
    $('#wrapper').css("display", "none")
    $('#iniciar').css("display", "flex")
    $('#players-button').click(function () {
        var players = $('#players')[0].value
        switch (players) {
            case "2":
                $('#iniciar-players').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-1').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-2').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-3').css("display", "none")
                $('#player-4').css("display", "none")
                $('#start-game').css("visibility", "visible")

                $('#player4-name').prop('required', false)
                $('#player3-name').prop('required', false)
                $('#naruto4').prop('required', false)
                $('#naruto3').prop('required', false)
                break;
            case "3":
                $('#iniciar-players').css("visibility", "visible")
                $('#player-1').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-2').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-3').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-4').css("display", "none")
                $('player4-name').prop('required', false)
                $('#start-game').css("visibility", "visible")

                $('#player4-name').prop('required', false)
                $('#player3-name').prop('required', true)
                $('#naruto4').prop('required', false)
                $('#naruto3').prop('required', true)
                break;
            case "4":
                $('#iniciar-players').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-1').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-2').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-3').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#player-4').css({
                    'visibility': 'visible',
                    'display': 'flex'
                })
                $('#start-game').css("visibility", "visible")

                $('#player4-name').prop('required', true)
                $('#player3-name').prop('required', true)
                $('#naruto4').prop('required', true)
                $('#naruto3').prop('required', true)
                break;

            default:
                break;
        }
    })



    // Creamos un array para almacenar las coordenadas de las casillas
    const casillas = [];
    // Rellenamos las casillas con las coordenadas del mapeo de la imagen (áreas)
    $('map[name="image-map"] area').each(function () {
        var coords = $(this).attr('coords').split(',');
        casillas.push(coords);
    });

    // Creamos otros arrays que contienen las posiciones de las casillas especiales
    const ocas = [4, 8, 13, 17, 26, 31, 35, 40, 44, 49, 53, 58, 62]
    const rerolls = [25, 52]
    const bridges = [5, 11]
    const death = 57

    // Clase para crear jugadores
    class Player {
        constructor(name, image, character,) {
            this.name = name,
                this.position = 0,
                this.character = character,
                this.image = image,
                this.movs_number = 0

        }

        Move(n, reroll = false) {
            // En el caso que se vuelva a tirar, pasaremos directamente el numero de casilla en lugar de la tirada,
            // puesto que no hará falta recorrer una a una
            if (reroll == true) {
                var coords = casillas[n]
                var self = this

                // Si es rectángulo
                if (coords.length == 4) {
                    var centroids = calculateRectangleCentroid(coords);
                } else {//si es polígono
                    var centroids = calculatePolygonCentroid(coords);
                }
                $('#ficha' + this.name).animate({
                    left: centroids[0] - 15,
                    top: centroids[1] - 15,
                    scale: 3
                }, {
                    duration: 700,
                    complete: function () {
                        $('#ficha' + self.name).animate({
                            scale: 1
                        }, 200)
                    }
                });
                //Actualizamos el reroll a false y la posición actual
                reroll = false
                this.position = n

            } else {
                var self = this
                //Si la tirada supera el número de casillas, avanza hacia atrás
                if (this.position + n > 62) {
                    var restante = this.position + n - 62
                    for (var i = this.position; i <= 62; i++) {
                        var coords = casillas[i]
                        // Si es rectángulo
                        if (coords.length == 4) {
                            var centroids = calculateRectangleCentroid(coords);
                        } else {//si es polígono
                            var centroids = calculatePolygonCentroid(coords);
                        }
                        $('#ficha' + this.name).animate({
                            left: centroids[0] - 15,
                            top: centroids[1] - 15,
                            scale: 3
                        }, {
                            duration: 700,
                            complete: function () {
                                $('#ficha' + self.name).animate({
                                    scale: 1
                                }, 200)
                            }
                        });
                    }
                    for (var i = 62; i > 62 - restante - 1; i--) {
                        var coords = casillas[i]
                        // Si es rectángulo
                        if (coords.length == 4) {

                            var centroids = calculateRectangleCentroid(coords);

                        } else {//si es polígono

                            var centroids = calculatePolygonCentroid(coords);
                        }
                        $('#ficha' + this.name).animate({
                            left: centroids[0] - 15,
                            top: centroids[1] - 15,
                            scale: 3
                        }, {
                            duration: 700,
                            complete: function () {
                                $('#ficha' + self.name).animate({
                                    scale: 1
                                }, 200)
                            }
                        });

                    }
                    this.position = i + 1

                } else {
                    for (var i = this.position; i < this.position + n; i++) {

                        var coords = casillas[i + 1]

                        // Guardamos una referencia al objeto actual
                        var self = this;
                        // Si es rectángulo
                        if (coords.length == 4) {

                            var centroids = calculateRectangleCentroid(coords);

                        } else {//si es polígono

                            var centroids = calculatePolygonCentroid(coords);
                        }
                        $('#ficha' + this.name).animate({
                            left: centroids[0] - 15,
                            top: centroids[1] - 15,
                            scale: 3
                        }, {
                            duration: 700,
                            complete: function () {
                                $('#ficha' + self.name).animate({
                                    scale: 1
                                }, 50)
                            }
                        });

                    }
                    this.position += n
                }




            }

            return true

        }
        RollDice() {
            var tirada = dice.roll();
        }
    }


    var dice = new Dice()

    //Creación de jugadores
    var jugadores = []
    var jugadoresArray = []
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
               console.log(jugador)
            }
        });
        // Crear jugadores
        var separador = 0;
       
        jugadores.forEach(jugador => {
            $('#player-turns').append(
                "<div class='player' id='" + jugador.nombre + "'>" +
                "<div class='player-name-card'>" +
                "<img class='player-image' width='100' src='" + jugador.personajeurl + "'>" +
                "<p>" + jugador.nombre + "</p>" +
                "</div>" +
                "<div id='" + jugador.nombre + "dice' class='dice'>" +
                "<div class='dice-roll'>" +
                "<img width=60 src='./public/images/Dice.png'>" +
                "<button id='" + jugador.nombre + "roll'>Tirar</button>" +
                "</div>" +
                "<div id='tirada" + jugador.nombre + "' class='tirada'>" +
                "<div>5</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );


            //Crear fichas de cada jugador
            $('#tablero-container').append(
                "<div class='moving-image' id='ficha" + jugador.nombre + "'>" +
                    "<img src='" + jugador.personajeurl + "' width='30'>" +
                    "<div class='animations-container'>"+
                        "<div id='puente"+jugador.nombre+"' class='bocadillo' >"+
                        "<div class='triangulo'></div>"+
                            "<div class='rectangulo'>"+
                                "<img src='./public/images/"+jugador.personaje+"/puente.jpg'>" +
                                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>"+
                                    "<h2 style='margin:0'>¡De Puente a Puente!</h2>"+
                                    "<span>y tiro porque me lleva la corriente</span>"+
                                "</div>"+
                            "</div>" +
                        "</div>" +
                        "<div id='oca"+jugador.nombre+"' class='bocadillo' >"+
                        "<div class='triangulo'></div>"+
                            "<div class='rectangulo'>"+
                                "<img src='./public/images/"+jugador.personaje+"/puente.jpg'>" +
                                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>"+
                                    "<h2 style='margin:0'>¡De Oca a OCa!</h2>"+
                                    "<span>y tiro porque me toca</span>"+
                                "</div>"+
                            "</div>" +
                        "</div>" +
                        "<div id='death"+jugador.nombre+"' class='bocadillo' >"+
                        "<div class='triangulo'></div>"+
                            "<div class='rectangulo'>"+
                                "<img src='./public/images/"+jugador.personaje+"/death.jpg'>" +
                                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>"+
                                    "<h2 style='margin:0'>¡Vuelta a Empezar!</h2>"+
                                    "<span>directo a la casilla de salida</span>"+
                                "</div>"+
                            "</div>" +
                        "</div>" +
                        "<div id='dados"+jugador.nombre+"' class='bocadillo' >"+
                        "<div class='triangulo'></div>"+
                            "<div class='rectangulo'>"+
                                "<img src='./public/images/"+jugador.personaje+"/puente.jpg'>" +
                                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>"+
                                    "<h2 style='margin:0'>¡Otra Tirada!</h2>"+
                                    "<span>tengo otro turno para tirar</span>"+
                                "</div>"+
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>"
            )
               
               

                $('#ficha' + jugador.nombre).css({
                    "left": (200 + separador) + "px",
                    "top": "695px"
                })
            separador = separador + 50
            //Creamos las instancias de jugadores y las metemos en el array
            jugadoresArray.push(new Player(jugador.nombre, jugador.personajeurl,jugador.personaje));
        });



        $('#wrapper').css('display', 'flex')
        $('#iniciar').css('display', 'none')

        turnos()
    });
    var turno = 0
    function turnos() {

        var rollAgain = false;

        $(".dice").css("visibility", "hidden");
        $(".tirada").css("visibility", "hidden");
        $(".bocadillo").css("visibility", "hidden");
        $("#" + jugadoresArray[turno].name + "roll").css('visibility', 'visible')
        $("#" + jugadoresArray[turno].name + "dice").css("visibility", "visible");

        $("#" + jugadoresArray[turno].name + "roll").off().click(function () {
            var tirada = dice.roll();
            $("#" + jugadoresArray[turno].name + "roll").css('visibility', 'hidden')
            $("#tirada" + jugadoresArray[turno].name).empty().append("<p>" + tirada + "</p>");
            $("#tirada" + jugadoresArray[turno].name).css("visibility", "visible");

            var movimientoJugador = jugadoresArray[turno].Move(tirada);

            if (movimientoJugador) {
                if (ocas.includes(jugadoresArray[turno].position)) {
                    var index = ocas.indexOf(jugadoresArray[turno].position);
                    var siguienteCasilla = ocas[index + 1];
                    var reroll = true;

                    setTimeout(() => {
                        $("#oca" + jugadoresArray[turno].name).css('visibility', 'visible')
                    }, 5000);
                    
                    setTimeout(() => {
                        jugadoresArray[turno].Move(siguienteCasilla, reroll);
                    }, 1000);
                    
                    rollAgain = true;
                } else if (bridges.includes(jugadoresArray[turno].position)) {
                    var index = bridges.indexOf(jugadoresArray[turno].position);
                    var siguienteCasilla = (index == 0) ? bridges[1] : bridges[0];
                    var reroll = true;
                    setTimeout(() => {
                        $("#puente" + jugadoresArray[turno].name).css('visibility', 'visible')
                    }, 1000);
                    
                    setTimeout(() => {
                        jugadoresArray[turno].Move(siguienteCasilla, reroll);
                    }, 1000);
                    
                    rollAgain = true;
                } else if (rerolls.includes(jugadoresArray[turno].position)) {
                    $("#dados" + jugadoresArray[turno].name).css('visibility', 'visible')
                    setTimeout(() => {
                        
                    }, 1000);
                    rollAgain = true;
                } else if (jugadoresArray[turno].position == 62) {
                    console.log("Has ganado");
                } else if (jugadoresArray[turno].position === death) {
                    var reroll = true;
                    $("#death" + jugadoresArray[turno].name).css('visibility', 'visible')
                    setTimeout(() => {
                        jugadoresArray[turno].Move(0, reroll);
                    }, 1000);
                    
                }
            }


        });

        $("#" + jugadoresArray[turno].name + "roll").on("click", function () {
            cambiarTurno(rollAgain);
        });
    }

    function cambiarTurno(rollAgain) {
        // Si rollAgain es verdadero, llamamos a turnos() para que el jugador actual haga un nuevo lanzamiento.
        // De lo contrario, cambiamos al siguiente jugador.
        if (rollAgain) {
            setTimeout(function () {
                turnos();
            }, 2000);
        } else {
            if (turno == jugadoresArray.length - 1) {
                turno = 0;
            } else {
                turno++;
            }
            // Una vez que se ha decidido el próximo turno, llamamos a turnos() para que el nuevo jugador pueda lanzar los dados.
            setTimeout(function () {
                turnos();
            }, 2000);

        }
    }
});






