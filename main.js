import {
  getCoeficientesTecnologicos,
  getFuncionObjetivo,
  getDisponibilidadRecursos,
  getInecuaciones,
  mostrarResultado
} from "./utils/DOMData.js";
import ProgramaLineal from "./ProgramaLineal.js";
import FuncionObjetivo from "./FuncionObjetivo.js";
import Restriccion from "./Restriccion.js";
import MetodoSimplex from "./MetodoSimplex.js";

resolve_button.addEventListener('click', () => {
  const n = parseInt(document.getElementById('variables_number').value, 10)
  const m = parseInt(document.getElementById('restrictions_number').value, 10)
  const fo = getFuncionObjetivo(n)
  const coeficientesTecnologicos = getCoeficientesTecnologicos(n, m)
  const inecuaciones = getInecuaciones(m)
  const disponibilidadRecursos = getDisponibilidadRecursos(m)

  const restricciones = []
  for (let i = 0; i < m; i++) {
    const restriccion = new Restriccion(
      coeficientesTecnologicos[i],
      inecuaciones[i],
      disponibilidadRecursos[i]
    )
    restricciones.push(restriccion)
  }
  const funcionObjetico = new FuncionObjetivo(fo[0], fo[1])
  const programaLineal = new ProgramaLineal(funcionObjetico, restricciones)
  const simplex = new MetodoSimplex(programaLineal)
  simplex.resolver()
  mostrarResultado('#resultado', simplex.solucionBasica)
})

document.addEventListener('multiples-salientes', () => {
  resultado.innerHTML = 'Existe dos o mas vectores candidatos para salir de base.'
})

