d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})
d3.dsv(';','data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
      marks: [
          Plot.barY(data,
            Plot.groupY({ y: "count" }, { x: "domicilio_comuna" , fill: "domicilio_comuna"})
          ),
      ], 
      marginLeft: 100, 
      height: 200,
      width: 554
    })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart_2').append(() => chart)
})
