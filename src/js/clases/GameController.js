import { Player } from "./Player.js"
import { Dice } from "./Dice.js"
export class GameController {
    constructor(casillas, animacioncasilla, animacioncierre, ocas, rerolls, bridges, death, tiempoPrimeraAnimacion, tiempoSegundaAnimacion) {
        this.turno = 0
        this.posicion = 0
        this.casillas = casillas
        this.animacioncasilla = animacioncasilla
        this.animacioncierre = animacioncierre
        this.ocas = ocas
        this.rerolls = rerolls
        this.bridges = bridges
        this.death = death
        this.tiempoPrimeraAnimacion = tiempoPrimeraAnimacion
        this.tiempoSegundaAnimacion = tiempoSegundaAnimacion
        this.dice = new Dice()

    }
    seleccionJugadores() {
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
    }
    crearJugadores(jugadores) {
        var separador = 0
        var jugadoresArray = []
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
                "<div class='animations-container'>" +
                "<div id='puente" + jugador.nombre + "' class='bocadillo' >" +
                "<div class='triangulo'></div>" +
                "<div class='rectangulo'>" +
                "<img src='./public/images/" + jugador.personaje + "/puente.jpg'>" +
                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>" +
                "<h2 style='margin:0'>¡De Puente a Puente!</h2>" +
                "<span>y tiro porque me lleva la corriente</span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div id='oca" + jugador.nombre + "' class='bocadillo' >" +
                "<div class='triangulo'></div>" +
                "<div class='rectangulo'>" +
                "<img src='./public/images/" + jugador.personaje + "/puente.jpg'>" +
                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>" +
                "<h2 style='margin:0'>¡De Oca a OCa!</h2>" +
                "<span>y tiro porque me toca</span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div id='death" + jugador.nombre + "' class='bocadillo' >" +
                "<div class='triangulo'></div>" +
                "<div class='rectangulo'>" +
                "<img src='./public/images/" + jugador.personaje + "/death.jpg'>" +
                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>" +
                "<h2 style='margin:0'>¡Vuelta a Empezar!</h2>" +
                "<span>directo a la casilla de salida</span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div id='dados" + jugador.nombre + "' class='bocadillo' >" +
                "<div class='triangulo'></div>" +
                "<div class='rectangulo'>" +
                "<img src='./public/images/" + jugador.personaje + "/puente.jpg'>" +
                "<div style='display:flex;justify-content:center;flex-direction:column;align-items:center'>" +
                "<h2 style='margin:0'>¡Otra Tirada!</h2>" +
                "<span>tengo otro turno para tirar</span>" +
                "</div>" +
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
            jugadoresArray.push(new Player(jugador.nombre, jugador.personajeurl, jugador.personaje));


        });
        return jugadoresArray
    }

    turnos(jugadoresArray, dice) {
        console.log(jugadoresArray)

        var self = this
        var rollAgain = false; //Variable para saber si es necesario volver a tirar
        var animationDuration = 0; //Variable que captura la duración de la animación del movimiento

        $(".dice").css("visibility", "hidden");
        $(".tirada").css("visibility", "hidden");
        $(".bocadillo").css("visibility", "hidden");

        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'visible')
        $("#" + jugadoresArray[self.turno].name + "dice").css("visibility", "visible");


        $("#" + jugadoresArray[self.turno].name + "roll").off().click(function () {
            var tirada = dice.roll();
            $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
            $("#tirada" + jugadoresArray[self.turno].name).empty().append("<p>" + tirada + "</p>");
            $("#tirada" + jugadoresArray[self.turno].name).css("visibility", "visible");

            var movimientoJugador = jugadoresArray[self.turno].Move(tirada, false, self.casillas, self.animacioncasilla, self.animacioncierre);
            jugadoresArray[self.turno].tiradas++
            animationDuration = movimientoJugador[1]


            if (movimientoJugador[0]) {
                //Cuando cae en la llegada
                if (jugadoresArray[self.turno].position == 62) {

                    if (self.turno === jugadoresArray.length || self.turno === jugadoresArray.length - 1) {
                        rollAgain = false
                    } else {
                        rollAgain = true;
                    }

                    self.posicion += 1
                    setTimeout(() => {
                        $('#ficha' + jugadoresArray[self.turno].name).hide()
                        $('#results').css('visibility', 'visible')
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                        $("tbody").append(
                            "<tr>" +
                            "<td>" + self.posicion + "</td>" +
                            "<td>" + jugadoresArray[self.turno].name + "</td>" +
                            "<td><img src='" + jugadoresArray[self.turno].image + "'></td>" +
                            "<td>" + jugadoresArray[self.turno].tiradas + "</td>" +
                            "<td>" + jugadoresArray[self.turno].movs_number + "</td>" +
                            "</tr>"

                        )
                        setTimeout(() => {
                            jugadoresArray.splice(self.turno, 1)
                        }, 200);


                    }, animationDuration + self.tiempoPrimeraAnimacion);





                } else if (jugadoresArray[self.turno].position === self.death) {

                    var dead = true;
                    rollAgain = false;
                    setTimeout(() => {

                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                        $("#death" + jugadoresArray[self.turno].name).css('visibility', 'visible')
                    }, animationDuration + self.tiempoPrimeraAnimacion);

                    setTimeout(() => {

                        $(".bocadillo").css("visibility", "hidden");
                        var muerte = jugadoresArray[self.turno].Move(0, dead, self.casillas, self.animacioncasilla, self.animacioncierre);

                        animationDuration = muerte[1]

                    }, animationDuration + self.tiempoSegundaAnimacion);


                    // Cuando cae en una oca
                } else if (self.ocas.includes(jugadoresArray[self.turno].position)) {

                    var index = self.ocas.indexOf(jugadoresArray[self.turno].position);
                    var siguienteCasilla = self.ocas[index + 1];
                    var reroll = true;
                    rollAgain = true;

                    setTimeout(() => {
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                        $("#oca" + jugadoresArray[self.turno].name).css('visibility', 'visible')
                    }, animationDuration + self.tiempoPrimeraAnimacion);
                    setTimeout(() => {
                        $(".bocadillo").css("visibility", "hidden");
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'visible')
                        var ocaMov = jugadoresArray[self.turno].Move(siguienteCasilla, reroll, self.casillas, self.animacioncasilla, self.animacioncierre);
                        animationDuration += ocaMov[1]

                    }, animationDuration + self.tiempoSegundaAnimacion);
                    setTimeout(() => {
                        if (jugadoresArray[self.turno].position === 62) {

                            self.posicion += 1

                            $('#ficha' + jugadoresArray[self.turno].name).hide()
                            $('#results').css('visibility', 'visible')
                            $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                            $("tbody").append(
                                "<tr>" +
                                "<td>" + self.posicion + "</td>" +
                                "<td>" + jugadoresArray[self.turno].name + "</td>" +
                                "<td><img src='" + jugadoresArray[self.turno].image + "'></td>" +
                                "<td>" + jugadoresArray[self.turno].tiradas + "</td>" +
                                "<td>" + jugadoresArray[self.turno].movs_number + "</td>" +
                                "</tr>"

                            )
                            jugadoresArray.splice(self.turno, 1)
                            if (jugadoresArray[self.turno] === jugadoresArray.length - 1) {
                                rollAgain = false
                            }


                        }
                    }, animationDuration + self.tiempoSegundaAnimacion);





                    //Cuando cae en un puente
                } else if (self.bridges.includes(jugadoresArray[self.turno].position)) {
                    $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                    var index = self.bridges.indexOf(jugadoresArray[self.turno].position);
                    var siguienteCasilla = (index == 0) ? self.bridges[1] : self.bridges[0];
                    var reroll = true;

                    setTimeout(() => {
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                        $("#puente" + jugadoresArray[self.turno].name).css('visibility', 'visible')

                    }, animationDuration + self.tiempoPrimeraAnimacion);
                    setTimeout(() => {
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'visible')
                        $(".bocadillo").css("visibility", "hidden");
                        var bridgeMov = jugadoresArray[self.turno].Move(siguienteCasilla, reroll, self.casillas, self.animacioncasilla, self.animacioncierre);
                        animationDuration = bridgeMov[1]

                    }, animationDuration + self.tiempoSegundaAnimacion);


                    rollAgain = true;

                    //Cuando cae en un dado
                } else if (self.rerolls.includes(jugadoresArray[self.turno].position)) {
                    setTimeout(() => {
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'hidden')
                        $("#dados" + jugadoresArray[self.turno].name).css('visibility', 'visible')

                    }, animationDuration + self.tiempoPrimeraAnimacion);


                    setTimeout(() => {
                        $("#" + jugadoresArray[self.turno].name + "roll").css('visibility', 'visible')
                        $(".bocadillo").css("visibility", "hidden");


                    }, animationDuration + self.tiempoSegundaAnimacion);
                    rollAgain = true;

                }
            }


        });
        var self = this;
        $("#" + jugadoresArray[self.turno].name + "roll").on("click", function () {
            setTimeout(() => {
                self.cambiarTurno(rollAgain,jugadoresArray);
            }, animationDuration + self.tiempoSegundaAnimacion + self.tiempoPrimeraAnimacion);



        });

    }

    cambiarTurno(rollAgain,jugadoresArray) {
        
        var self = this;
        if (jugadoresArray.length == 0) {
            var tabla = $('#results').html()

            $('#final').append(
                '<i id="final-logo" class="fa-solid fa-flag-checkered"></i>'
            )
            $('#final').append(tabla)
            $('#final').append(
                "<div style='display:flex;justify-content:center;align-items:center;gap:20px'>" +
                "<button class='reiniciar'><i class='fa-solid fa-arrow-rotate-right'></i> Reiniciar partida</button>" +
                "<button onclick='location.reload();'><i class='fa-solid fa-arrow-right-from-bracket'></i> Cambiar jugadores</button>" +
                "</div>"
            )
            $('#wrapper').css('display', 'none')
            $('#final').css('display', 'flex')
        } else {
            // Si rollAgain es verdadero, llamamos a turnos() para que el jugador actual haga un nuevo lanzamiento.

            if (rollAgain) {

                self.turnos(jugadoresArray, this.dice);


                // De lo contrario, cambiamos al siguiente jugador.
            } else {
                if (self.turno == jugadoresArray.length - 1 || self.turno == jugadoresArray.length) {
                    self.turno = 0;
                } else {
                    self.turno++;
                }
                // Una vez que se ha decidido el próximo turno, llamamos a turnos() para que el nuevo jugador pueda lanzar los dados.

                self.turnos(jugadoresArray, this.dice);


            }
        }

    }
}