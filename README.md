Este es un proyecto de Next.js creado con [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app?utm_source=chatgpt.com).

## Primeros pasos

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000?utm_source=chatgpt.com) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando el archivo `app/page.tsx`. La página se actualizará automáticamente a medida que edites el archivo.

Este proyecto utiliza [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts?utm_source=chatgpt.com) para optimizar y cargar automáticamente [Geist](https://vercel.com/font?utm_source=chatgpt.com), una nueva familia tipográfica de Vercel.

## Aprende más

Para aprender más sobre Next.js, revisa los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs?utm_source=chatgpt.com) — aprende sobre las funcionalidades y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn?utm_source=chatgpt.com) — tutorial interactivo de Next.js.

También puedes consultar el repositorio oficial de [Next.js en GitHub](https://github.com/vercel/next.js?utm_source=chatgpt.com). ¡Tus comentarios y contribuciones son bienvenidos!

## Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación de Next.js es utilizando la plataforma [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_campaign=create-next-app-readme&utm_source=chatgpt.com), creada por los desarrolladores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying?utm_source=chatgpt.com) para más detalles.

## Demo

[test-multi-uploads.vercel.app](https://test-multi-uploads.vercel.app/?utm_source=chatgpt.com)

## Parte A - Cuestionario

- 1 (src/types/file-descriptor-A.ts, src/utils/file-upload-A.ts)
  Utilicé discriminated unions en para modelar estados válidos del flujo de subida. El progreso solo existe en el estado "uploading", evitando inconsistencias mediante type narrowing, igual que error solo existe en el estado "error". Separé tipos y lógica utilitaria para mantener una arquitectura modular y escalable.

- 2 (src/utils/map-files-to-descriptors-A.ts)
  Utilicé Array.from para normalizar tanto FileList como File[] en una estructura iterable
  uniforme. La eliminación de duplicados se implementó mediante Map, usando name + size como clave compuesta y evitar uploads redundantes. Finalmente, se asigna un identificador con crypto.randomUUID() para facilitar rendering en React.

- 3 (src/utils/limit-concurrency-A)
  Implemente un patrón worker pool para limitar la cantidad de tareas concurrentes.
  Cada worker consume tareas compartiendo un índice global, mientras que el resultado se almacena
  usando el índice original para preservar el orden. Esto evita sobrecargar memoria y
  mejora la estabilidad frente a grandes volúmenes de operaciones async.
