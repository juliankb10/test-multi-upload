This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

https://test-multi-uploads.vercel.app/

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
