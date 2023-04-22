const mapaFetch = d3.json('../datos/callesPalermo.geojson')
const dataFetch = d3.dsv(';', '../datos/147_vehiculos_mal_estacionados_aux3.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })

  //Filtro el barrio mas denso y las horas pico
  let data_aux = data.filter( item => 
    item.hora_ingreso_aux == '12' || 
    item.hora_ingreso_aux == '13' || 
    item.hora_ingreso_aux == '14' || 
    item.hora_ingreso_aux == '15' || 
    item.hora_ingreso_aux == '16' || 
    item.domicilio_barrio == 'PALERMO')

  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    // color: {
    //   // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
    //   type: 'quantize', 
    //   n: 10,
    //   scheme: 'ylorbr',
    //   label: 'Cantidad de denuncias',
    //   legend: true,
    // },
    marks: [
      Plot.density(data_aux, {
        x: "lon", y: "lat", fill: "density"}),
        Plot.geo(data_aux,{
          stroke: "gray", 
          title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        }),
        // fill: d => d.properties.DENUNCIAS,
        // stroke: 'gray',
    ],
  })

  //filter: (d) => d.properties.BARRIO > 
 /*  Agregamos al DOM la visualización chartMap */
   d3.select('#chart_3').append(() => chartMap3)
})

