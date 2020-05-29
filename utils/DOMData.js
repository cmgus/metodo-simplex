export function getCoeficientesTecnologicos(n, m) {
  let A = []
  for (let i = 0; i < m; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      const a = document.getElementById(`a${i + 1}${j + 1}`).value
      row.push(a === "" ? 0 : parseInt(a, 10))
    }
    A.push(row)
  }
  return A
}

export function getFuncionObjetivo(n) {
  const type = document.getElementById('type').value
  const vectorCostos = []
  for (let i = 0; i < n; i++) {
    const z = document.getElementById(`z${i + 1}`).value
    vectorCostos.push(z === '' ? 0 : parseInt(z, 10))
  }
  return [type, vectorCostos]
}

export function getInecuaciones(m) {
  const inecuaciones = []
  for (let i = 0; i < m; i++) {
    const inecuacion = document.getElementById(`inequality${i + 1}`).value
    inecuaciones[i] = (inecuacion)
  }
  return inecuaciones
}

export function getDisponibilidadRecursos(m) {
  const B = []
  for (let i = 0; i < m; i++) {
    const b = document.getElementById(`b${i + 1}`).value
    B[i] = (b === "" ? 0 : parseInt(b, 10))
  }
  return B
}

export function mostrarResultado(query, solucionBasica) {
  const table = document.querySelector(query)
  table.innerHTML = ''
  for(let i = 0; i < solucionBasica.length; i++) {
    const row = document.createElement('tr')
    for (let j = 0; j < solucionBasica[i].length; j++) {
      const col = document.createElement('td')
      col.innerHTML = solucionBasica[i][j]
      row.appendChild(col)
    }
    table.appendChild(row)
  }
}