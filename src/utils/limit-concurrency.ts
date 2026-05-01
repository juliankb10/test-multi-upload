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
