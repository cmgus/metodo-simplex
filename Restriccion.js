class Restriccion {
  /**
   * 
   * @param {Array} coTec Vector de coeficientes tecnológicos
   * @param {number} dispRec Disponibilidad de recursos
   */
  constructor(coTec, tipo, dispRec) {
    this.coeficientesTecnologicos = coTec
    this.tipo = tipo
    this.disponibilidadRecursos = dispRec
  }
  toMayorIgualQue() {
    this.tipo = '>='
  }
  toMenorIgualQue() {
    if (this.tipo === '>=') {
      for (let i = 0; i < this.coeficientesTecnologicos.length; i++) {
        this.coeficientesTecnologicos[i] *= -1
      }
      this.disponibilidadRecursos *= -1
      this.tipo = '<='
    }
    if (this.tipo === '=') { throw 'Implementar la equivalencia de la restriccion estructural = a <='}
  }
  toIgualQue() {
    throw 'Méotdo {toIgualQue} no implementado'
  }
}

export default Restriccion