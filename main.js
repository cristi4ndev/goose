function calculatePolygonCentroid(coords) {
    var n = coords.length / 2; // número de vértices
    var area = 0; // área del polígono
    var cx = 0; // coordenada x del centroide
    var cy = 0; // coordenada y del centroide

    for (var i = 0; i < n; i++) {
        var xi = parseFloat(coords[2 * i]);
        var yi = parseFloat(coords[2 * i + 1]);
        var xj = parseFloat(coords[(2 * i + 2) % (2 * n)]);
        var yj = parseFloat(coords[(2 * i + 3) % (2 * n)]);

        area += xi * yj - xj * yi;
        cx += (xi + xj) * (xi * yj - xj * yi);
        cy += (yi + yj) * (xi * yj - xj * yi);
    }

    area /= 2;
    cx /= 6 * area;
    cy /= 6 * area;

    return { x: cx, y: cy };
}

$(document).ready(function() {

    var positions = $('area').each.attr('coords')
    console.log(positions)



    // Manejar clics en las áreas
    $('area').click(function() {
        // Obtener las coordenadas del área clicada
        var coords = $(this).attr('coords').split(',');

        // Calcular el centro del área clicada
        var centroid = calculatePolygonCentroid(coords);

        // Mover la imagen al centro del área clicada
        $('#moving-image').css({ 'left': centroid.x, 'top': centroid.y });
    });
});



$(document).ready(function () {
    // Manejar clics en las áreas
    $('area').click(function () {
        // Obtener las coordenadas del área clicada
        var coords = $(this).attr('coords').split(',');
        console.log(coords)



        // Calcular el centro del área clicada

        //si es rectangulo
            if (coords.length==4){
            // Obtener las coordenadas x e y de la esquina superior izquierda del área
            var x1 = parseInt(coords[0]);
            var y1 = parseInt(coords[1]);

            // Obtener las coordenadas x e y de la esquina inferior derecha del área
            var x2 = parseInt(coords[2]);
            var y2 = parseInt(coords[3]);
            var centerX = (x1 + x2) / 2;
            var centerY = (y1 + y2) / 2;
        }
        //si es poligono
        var centroid = calculatePolygonCentroid(coords);

        // Mover la imagen a las coordenadas del área clicada
        $('#moving-image').css({ 'left': centerX, 'top': centerY });
    });
});
