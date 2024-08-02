$(document).ready(function() {
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();

        const heroId = $('#heroId').val();

        if (heroId < 1 || heroId > 731) {
            alert('Escribe un numero entre 1 y 731.');
            return;
        }


        $.ajax({
            dataType: "json",
            type: "GET",
            url: "https://superheroapi.com/api.php/10226569611764208/" + heroId,
            
            success: function(response) {
                const heroInfo = `
                <h1>SuperHero encontrado</h1>
                <div class="card">
                <div class="card-body">
                <div class="row align-items-start">
                <div class="col">
                <img src="${response.image.url}" class="card-img-top" alt="${response.name}">
                </div>
                <div class="col text-start">
                <h5 class="card-title">Nombre: ${response.name}</h5>
                <p class="card-text">Conexiones: ${response.connections["group-affiliation"]}</p>
                <p class="card-text">Ocupacion: ${response.work.occupation}</p>
                <p class="card-text">Primera aparicion: ${response.biography["first-appearance"]}</p>
                <p class="card-text">Altura: ${response.appearance.height}</p>
                <p class="card-text">Peso: ${response.appearance.weight}</p>
                <p class="card-text">Alianzas: ${response.biography.aliases}</p>
                </div>
                </div>
                </div>
                </div>
                `;
                $('#heroInfo').html(heroInfo);
                
                const chartData = [];
                $.each(response.powerstats, function(stat, value) {
                    chartData.push({ label: stat, y: parseInt(value) || 0 });
                });

                const chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true, 
                    theme: "light2",
                    title: {
                        text: "Estadisticas de poder de: " + response.name,
                        fontColor: "black"
                    },
                    data: [{
                        indexLabelFontColor: "black",
                        type: "pie",
                        dataType: "doughnut",
                        startAngle: 240,
                        yValueFormatString: "##0\"%\"",
                        indexLabel: "{label} {y}",
                        dataPoints: chartData
                    }]
                });

                chart.render();
},

            error: function(error) {
                console.log("Objeto error: ", error)
                console.log('Error al obtener la información del superheroe:', error.status);
            }
});
    });
});