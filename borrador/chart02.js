d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

  /* Agregamos al DOM la visualización chartMap */
  d3.dsv(";",'147_vehiculos_mal_estacionados_aux3.csv', d3.autoType).then(data => {
    console.log(data)
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      marks: [
        Plot.boxX(data, { 
            x: "categoria",
            y: "duracion_usuario"[],
        }),
        ],
        x: {
          label: null,
          line: true,
        },
        y: {
          label: null,
          line: true,
        },})
  d3.select('#chart02').append(() => chart)
})