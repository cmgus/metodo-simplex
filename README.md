# Implementacón del método simplex con Javascript

## Pasos:

1. Dado un programa lineal.
2. Transformar por reglas de equivalencia a la forma canónica.
3. Reescribir la función objetivo de la siguiente manera: `z - cx = 0`.
4. Convierta todas las desigualdades en igualdades agregando las variables de holgura.
5. Construya el tablero del método simplex.
6. Si Z<sub>j</sub> - C<sub>j</sub> es mayor o igual que cero ___ir al paso 10___.
7. Seleccione como vector que entre a la base cuyo Z<sub>j</sub> - C<sub>j</sub> sea el más negativo.
8. Seleccione el vector que sale de la base:
X<sub>r</sub> = min [X<sub>Br</sub> / y<sub>kj</sub> ; tal que y<sub>kj</sub> > 0]
9. Aplique operaciones matriciales elementales en el pivot y<sub>rj</sub> con el objetivo de convertir la columna a<sub>j</sub> en vector unitario.
10. La solución x<sub>B</sub> mostrada es oṕtima.

