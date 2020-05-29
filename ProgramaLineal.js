import Restriccion from "./Restriccion.js"
import FuncionObjetivo from "./FuncionObjetivo.js"

class ProgramaLineal {
  /**
   * 
   * @param {FuncionObjetivo} fo Función objetivo
   * @param {Array<Restriccion>} res Restricciones
   */
  constructor(fo, res) {
    this.funcionObjetivo = fo
    this.restricciones = res
  }
  formaCanonica() {
    this.funcionObjetivo.toMAX()
    for (let i = 0; i < this.restricciones.length; i++) {
      this.restricciones[i].toMenorIgualQue()
    }
  }
  reescribirFuncionObjetivo() {
    for (let i = 0; i < this.funcionObjetivo.vectorCostos.length; i++) {
      this.funcionObjetivo.vectorCostos[i] *= -1
    }
    this.funcionObjetivo.vectorCostos.unshift(this.funcionObjetivo.isOriginal ? 1 : -1)
    this.funcionObjetivo.vectorCostos.push(0)
  }
}

export default ProgramaLineal