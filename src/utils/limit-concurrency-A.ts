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
  Implemente un patrón worker pool para limitar la cantidad de tareas concurrentes.
  Cada worker consume tareas compartiendo un índice global, mientras que el resultado se almacena
  usando el índice original para preservar el orden. Esto evita sobrecargar memoria y
  mejora la estabilidad frente a grandes volúmenes de operaciones async.
*/
