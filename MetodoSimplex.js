import ProgramaLineal from "./ProgramaLineal.js"

class MetodoSimplex {
  /**
   * 
   * @param {ProgramaLineal} progLine Programa lineal
   */
  constructor(progLine) {
    this.programaLineal = progLine
    this.solucionBasica = []
  }
  resolver() {
    this.programaLineal.formaCanonica()
    // Z = CX => Z - CX = 0
    this.programaLineal.reescribirFuncionObjetivo()

    this.toIgualdades()
    this.contruirTableroSimplex()

    let contador = 0
    while (!this.isOptimo()) {
      console.table(this.solucionBasica)
      let columnaPivote = []
      let elementoPivote = 0
      let nuevaFilaPivote = []
      let filaPivote = []

      let indiceVectorEntra = 1
      let masNegativo = this.solucionBasica[0][1]

      for (let i = 1; i < this.solucionBasica[0].length; i++) {
        if (this.solucionBasica[0][i] < masNegativo) {
          indiceVectorEntra = i
          masNegativo = this.solucionBasica[0][i]
        }
      }
      let indiceVectorSale = 1
      let minElemento = 1000
      for (let i = 1; i < this.solucionBasica.length; i++) {
        const xBr = this.solucionBasica[i][this.solucionBasica[i].length - 1]
        const ykj = this.solucionBasica[i][indiceVectorEntra]
        if (ykj > 0) {
          const valor = parseFloat(xBr / ykj)
          if (minElemento === valor) {
            return document.dispatchEvent(new CustomEvent('multiples-salientes'))
          }
          if (minElemento > valor) {
            minElemento = valor
            indiceVectorSale = i
          }
        }
      }
      for (let i = 0; i < this.solucionBasica.length; i++) {
        columnaPivote.push(this.solucionBasica[i][indiceVectorEntra])
      }
      elementoPivote = this.solucionBasica[indiceVectorSale][indiceVectorEntra]

      filaPivote = this.solucionBasica[indiceVectorSale]
      for (let j = 0; j < this.solucionBasica[indiceVectorSale].length; j++) {
        nuevaFilaPivote.push(filaPivote[j] / elementoPivote)
      }

      for (let i = 0; i < this.solucionBasica.length; i++) {
        for (let j = 0; j < this.solucionBasica[i].length; j++) {
          if (i !== indiceVectorSale) {
            this.solucionBasica[i][j] -= (columnaPivote[i] * nuevaFilaPivote[j])
          }
        }
      }
      this.solucionBasica[indiceVectorSale] = nuevaFilaPivote

      contador++
      if (contador === 21) {
        console.log('Segenero un bucle infinito')
        console.log(this.solucionBasica)
        break
      }
    }

  }
  contruirTableroSimplex() {
    // insertando la fila Z
    const colCountSolucionBasica = this.programaLineal.funcionObjetivo.vectorCostos.length + this.programaLineal.restricciones.length
    const rowZ = []
    for (let i = 0; i < colCountSolucionBasica; i++) {
      const z = this.programaLineal.funcionObjetivo.vectorCostos[i]
      rowZ.push(typeof z === 'undefined' ? 0 : z)
    }
    this.solucionBasica.push(rowZ)
    //console.log('row z', rowZ)
    // insertando las demas filas
    for (let i = 0; i < this.programaLineal.restricciones.length; i++) {
      const row = [0]
      for (let j = 0; j < colCountSolucionBasica - 2; j++) {
        const a = this.programaLineal.restricciones[i].coeficientesTecnologicos[j]
        row.push(typeof a === 'undefined' ? 0 : a)
      }
      row.push(this.programaLineal.restricciones[i].disponibilidadRecursos)
      this.solucionBasica.push(row)
    }
    // console.table(this.solucionBasica)
    //console.log(this.programaLineal)
  }
  // Agregando las variables de holgura
  toIgualdades() {
    const rowCount = this.programaLineal.restricciones.length
    const colCount = this.programaLineal.funcionObjetivo.vectorCostos.length
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        //console.log(`[${i}][${j}]`)
        if (i === j) {
          this.programaLineal.restricciones[i].coeficientesTecnologicos.push(1)
          continue
        }
        this.programaLineal.restricciones[i].coeficientesTecnologicos.push(0)
      }
    }
  }
  isOptimo() {
    let optimo = true
    for (let j = 1; j < this.solucionBasica[0].length; j++) {
      if (this.solucionBasica[0][j] < 0) {
        optimo = false
        break
      }
    }
    return optimo
  }
}

export default MetodoSimplex