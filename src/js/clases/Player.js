 // Clase para crear jugadores
 export class Player {
    constructor(name, image, character,) {
        this.name = name,
            this.position = 0,
            this.character = character,
            this.image = image,
            this.movs_number = 0
        this.tiradas = 0

    }

    Move(n, reroll = false, casillas,animacioncasilla,animacioncierre) {
        //Esta variable la devolveremos en el return para calcular cuánto dura la animación de mover la ficha
        var tiempoAnimacion = 0
        // En el caso que se vuelva a tirar, pasaremos directamente el numero de casilla en lugar de la tirada,
        // puesto que no hará falta recorrer una a una
        if (reroll == true) {
            tiempoAnimacion = animacioncasilla
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
                duration: animacioncasilla,
                complete: function () {
                    $('#ficha' + self.name).animate({
                        scale: 1
                    }, animacioncierre)
                }
            });
            //Actualizamos el reroll a false y la posición actual
            reroll = false
            this.position = n

        }else {
            var self = this
            //Si la tirada supera el número de casillas, avanza hacia atrás
            if (this.position + n > 62) {
                var restante = this.position + n - 62
                for (var i = this.position; i <= 62; i++) {
                    this.movs_number++
                    tiempoAnimacion += animacioncasilla
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
                        duration: animacioncasilla,
                        complete: function () {
                            $('#ficha' + self.name).animate({
                                scale: 1
                            }, animacioncierre)
                        }
                    });
                }
                for (var i = 62; i > 62 - restante - 1; i--) {
                    tiempoAnimacion += animacioncasilla
                    this.movs_number++
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
                        duration: animacioncasilla,
                        complete: function () {
                            $('#ficha' + self.name).animate({
                                scale: 1
                            }, animacioncierre)
                        }
                    });

                }
                this.position = i + 1

            } else {
                
                for (var i = this.position; i < this.position + n; i++) {
                    this.movs_number++
                 
                    var coords = casillas[i + 1]
                    tiempoAnimacion += animacioncasilla
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
                        duration: animacioncasilla,
                        complete: function () {
                            $('#ficha' + self.name).animate({
                                scale: 1
                            }, animacioncierre)
                        }
                    });


                }

                this.position += n


            }




        }

        return [true, tiempoAnimacion]

    }

}