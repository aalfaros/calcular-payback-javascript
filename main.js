const inversionInicial = document.querySelector('#ano0')
const anio1 = document.querySelector('#ano1')
const anio2 = document.querySelector('#ano2')
const anio3 = document.querySelector('#ano3')
const anio4 = document.querySelector('#ano4')
const anio5 = document.querySelector('#ano5')

const anio1aj = document.querySelector('#ano1aj')
const anio2aj = document.querySelector('#ano2aj')
const anio3aj = document.querySelector('#ano3aj')
const anio4aj = document.querySelector('#ano4aj')
const anio5aj = document.querySelector('#ano5aj')

const anio0acum = document.querySelector('#ano0acum')
const anio1acum = document.querySelector('#ano1acum')
const anio2acum = document.querySelector('#ano2acum')
const anio3acum = document.querySelector('#ano3acum')
const anio4acum = document.querySelector('#ano4acum')
const anio5acum = document.querySelector('#ano5acum')

/* document.addEventListener(
  'change',
  e => {
    console.log(e.target.id)
    if (e.target.id === 'tasaDscto') return

    const entrada = e.target.value.split(',')
    const parteEntera = entrada[0].replace(/\./g, '')
    const parteDecimal = entrada[1]
    const salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    e.target.value =
      salida + (parteDecimal !== undefined ? ',' + parteDecimal : '')
  },
  false
) */

document.addEventListener('click', e => {
  const btnCalcular = document.querySelector('#calcular')

  if (e.target === btnCalcular) {
    const flujoCajaNominal = [
      parseInt(inversionInicial.value) * -1,
      parseInt(anio1.value),
      parseInt(anio2.value),
      parseInt(anio3.value),
      parseInt(anio4.value),
      parseInt(anio5.value)
    ]

    console.log(flujoCajaNominal)

    const flujoCajaAjustado = calcularFlujoCajaAjustado(flujoCajaNominal)
    renderizarFlujoCajaAjustado(flujoCajaAjustado)

    const flujoCajaAcumulado = calcularFlujoCajaAcumulado(flujoCajaAjustado)
    renderizarFlujoCajaAcumulado(flujoCajaAcumulado)

    const payback = calcularPayback(flujoCajaAjustado, flujoCajaAcumulado)
    document.querySelector(
      '.salida'
    ).innerHTML = `<p style="color: blue;">El payback es de ${payback} años</p>`
  }
})

function calcularFlujoCajaAjustado(flujoCajaNominal) {
  const tasaDscto = parseFloat(document.querySelector('#tasaDscto').value)

  const flujoCajaAjustado = flujoCajaNominal.map((valor, i) => {
    if (i === 0) return valor
    return parseInt(valor / (1 + tasaDscto) ** i)
  })

  console.log(flujoCajaAjustado)
  return flujoCajaAjustado
}

function calcularFlujoCajaAcumulado(flujoCajaAjustado) {
  let suma = 0

  const flujoCajaAcumulado = flujoCajaAjustado.map(valor => {
    suma += valor
    return suma
  })

  console.log(flujoCajaAcumulado)
  return flujoCajaAcumulado
}

function calcularPayback(flujoCajaAjustado, flujoCajaAcumulado) {
  let anioPrimeraCajaPositiva = 0
  let anioUltimaCajaNegativa = 0

  flujoCajaAcumulado.map((caja, i) => {
    if (caja > 0 && anioPrimeraCajaPositiva === 0) {
      anioPrimeraCajaPositiva = i
      anioUltimaCajaNegativa = i - 1
    }
  })

  console.log('año de la última caja negativa: ' + anioUltimaCajaNegativa)
  console.log(
    'último valor negativo: ' + flujoCajaAcumulado[anioUltimaCajaNegativa]
  )
  console.log(
    'primera caja positiva: ' + flujoCajaAjustado[anioPrimeraCajaPositiva]
  )

  const payback =
    anioUltimaCajaNegativa -
    ((flujoCajaAcumulado[anioUltimaCajaNegativa] /
      flujoCajaAjustado[anioPrimeraCajaPositiva]) *
      12) /
      10

  return payback.toFixed(1)
}

function renderizarFlujoCajaAjustado(flujoCajaAjustado) {
  anio1aj.value = flujoCajaAjustado[1]
  anio2aj.value = flujoCajaAjustado[2]
  anio3aj.value = flujoCajaAjustado[3]
  anio4aj.value = flujoCajaAjustado[4]
  anio5aj.value = flujoCajaAjustado[5]
}

function renderizarFlujoCajaAcumulado(flujoCajaAcumulado) {
  anio0acum.value = flujoCajaAcumulado[0]
  anio1acum.value = flujoCajaAcumulado[1]
  anio2acum.value = flujoCajaAcumulado[2]
  anio3acum.value = flujoCajaAcumulado[3]
  anio4acum.value = flujoCajaAcumulado[4]
  anio5acum.value = flujoCajaAcumulado[5]
}
