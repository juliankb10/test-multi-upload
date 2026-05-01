export async function limitConcurrency<T>(
  pool: number,
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);

  let nextTaskIndex = 0;

  async function worker(): Promise<void> {
    while (nextTaskIndex < tasks.length) {
      const currentIndex = nextTaskIndex++;

      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from(
    {
      length: Math.min(pool, tasks.length),
    },
    () => worker(),
  );

  await Promise.all(workers);

  return results;
}

/*
La implementación usa un patrón worker pool para limitar la cantidad de tareas concurrentes. 
Cada worker consume tareas compartiendo un índice global, mientras que el resultado se almacena 
usando el índice original para preservar el orden. Esto evita sobrecargar red/memoria y 
mejora la estabilidad frente a grandes volúmenes de operaciones async.
*/

/*
Cómo hablar de backpressure (MUY importante)

El backpressure se maneja limitando explícitamente el número de tareas concurrentes (pool), 
evitando saturar recursos como red, CPU o APIs externas. En escenarios reales también podría 
combinarse con colas, rate limiting o pausas dinámicas según métricas de throughput o 
errores del servidor.

Cómo hablar de errores parciales

Ahora mismo Promise.all(workers) falla si una tarea falla.

Para soportar errores parciales en producción, usaría Promise.allSettled o almacenaría 
resultados tipados como Result<T, Error> por tarea. Así el sistema puede continuar 
procesando uploads restantes sin abortar toda la operación ante un único fallo.
*/
