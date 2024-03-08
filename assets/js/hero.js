
$(document).ready(function () {
  //capturo el formulario
  $("#searchForm").submit(function (event) {
    //prevenir el envio del formulario por defecto
    event.preventDefault();
    
    //crear una variable qie capture el valor de la busqueda
    var buscarHero = $("#superHero").val().trim();

    //validar que se jaya ingresado un numero 
    if (!buscarHero.match(/^\d+$/)) {
      alert("Por favor, ingresa solo números.");
      return;
    }

    const apiKey = "4905856019427443";
    const apiUrl = `https://superheroapi.com/api.php/${apiKey}/${buscarHero}`;

    // Hacer la petición a la API
    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: "json",
      success: function (datosHero) {
        console.log(datosHero)
        let detalles = datosHero;
        let detallesNombre = detalles.name;
        let cardHtml = `<h2>SuperHero Encontrado: ${detallesNombre}</h2>
        <div class="card mb-3" style="height: 50%; width: 100%;">
      <div class="row g-0">
        <div class="col-md-4">
          <img id="heroImage" src="${datosHero.image.url}" style="height: 70%; width: 100%;" class="card-img-top img-fluid" alt="">
      </div>
          <div class="col-md-8">
            <div class="card-body">            
            <p class="card-text">Nombre: ${datosHero.name} <br> <br>Connections: ${datosHero.connections["group-affiliation"]}<br> </p>
            <p class="card-text">Publisher: ${datosHero.biography.publisher} <hr> Occupation: ${datosHero.work.occupation} <hr> First Appearance: ${datosHero.biography["first-appearance"]} <hr> Height: ${datosHero.appearance.height[0]} <hr> Weight: ${datosHero.appearance.weight[0]} <hr>Aliases: ${datosHero.biography.aliases}  </p>
          </div>
        </div>`
        
        $("#card").html(cardHtml)

        var chart = new CanvasJS.Chart("container", {
          theme: "ligth2",
          exportEnabled: true,
          animationEnabled: true,
          title: {
            text: "Estadísticas de poder" + "" + detallesNombre
          },
          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - ({y})",
            dataPoints: [
              { y: parseInt(datosHero.powerstats.intelligence), label: "Intelligence" },
              { y: parseInt(datosHero.powerstats.strength), label: "Strength" },
              { y: parseInt(datosHero.powerstats.speed), label: "speed" },
              { y: parseInt(datosHero.powerstats.durability), label: "durability" },
              { y: parseInt(datosHero.powerstats.power), label: "power" },
              { y: parseInt(datosHero.powerstats.combat), label: "combat" },
  
            ]
          }]
        });
        //mostrar el gráfico con la funcion, que captura el id de html para activar el canvasJSChat la cual mostrara el grafico (chart)
        chart.render();
      

      },    
      // Si hay un error en la petición
      error: function () {
        alert('Error al buscar el SuperHero. Por favor, intenta de nuevo más tarde.');
        
      }
    });      
  });
});