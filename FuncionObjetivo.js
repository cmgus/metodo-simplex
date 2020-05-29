class FuncionObjetivo {
  /**
   * 
   * @param {string} tipo Tipo de optimización (MAX, MIN)
   * @param {Array} vecCost Vector de costos
   */
  constructor(tipo, vecCost) {
    this.tipo = tipo
    this.vectorCostos = vecCost
    this.isOriginal = true
  }
  toMAX() {
    if (this.tipo === 'MIN') {
      for (let i = 0; i < this.vectorCostos.length; i++) {
        this.vectorCostos[i] *= -1
      }
      this.tipo = 'MAX'
      this.isOriginal = false
    }
  }
  toMIN() {
    throw 'Método {toMIN} no implementado.'
  }
}

export default FuncionObjetivo