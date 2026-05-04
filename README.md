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

# Decisiones Técnicas

## Arquitectura basada en responsabilidades

La aplicación fue estructurada separando responsabilidades en diferentes capas:

```txt
app/
components/
schemas/
services/
store/
types/
utils/
```

Esto permite:

- Mejor mantenibilidad.
- Reutilización de lógica.
- Separación entre UI, lógica de negocio y comunicación HTTP.
- Escalabilidad del proyecto.

---

# Manejo de uploads concurrentes

Se implementó un sistema de uploads concurrentes controlados mediante `limitConcurrency`, evitando saturar la red o el navegador al subir múltiples archivos simultáneamente.

```ts
const MAX_CONCURRENT_UPLOADS = 10;
```

Cada archivo se procesa de manera independiente, permitiendo:

- progreso individual,
- cancelación individual,
- reintentos individuales,
- manejo de errores por archivo.

---

# Uso de XMLHttpRequest para progreso real

Se utilizó `XMLHttpRequest` en lugar de `fetch` para soportar progreso real de subida mediante:

```ts
xhr.upload.onprogress;
```

Esto permite actualizar visualmente el porcentaje de carga de cada archivo en tiempo real.

---

# Cancelación de uploads con AbortController

Cada upload utiliza un `AbortController` independiente para permitir cancelación individual de archivos durante la subida.

```ts
controller.abort();
```

Esto mejora la experiencia de usuario y evita uploads innecesarios.

---

# Persistencia mock desacoplada

Se implementó una persistencia mock utilizando Route Handlers de Next.js:

```txt
/api/upload
/api/upload/complete
```

Esto permite desarrollar y probar toda la lógica frontend sin depender de infraestructura real de almacenamiento.

Además:

- se simularon delays de red,
- fallos aleatorios (20%),
- IDs dinámicos,
- URLs mock.

---

# Manejo de errores y reintentos

La aplicación contempla:

- errores de red,
- cancelaciones,
- fallos aleatorios simulados,
- validaciones de archivos,
- reintentos manuales por archivo.

Cada error es manejado de forma aislada para no afectar otros uploads.

---

# Prevención de archivos duplicados

Los archivos se deduplican utilizando la combinación:

```ts
name + size;
```

Esto evita uploads repetidos y mejora la experiencia de usuario.

---

# Validaciones con Formik + Yup

Se utilizó:

- Formik para manejo de formularios,
- Yup para validaciones declarativas.

Validaciones implementadas:

- mínimo y máximo de archivos,
- tamaño máximo por archivo,
- validación de campos requeridos,
- bloqueo de submit mientras existan uploads pendientes.

---

# Accesibilidad

La interfaz incorpora mejoras de accesibilidad como:

- labels asociados a inputs,
- navegación por teclado,
- focus visible,
- `aria-live` para estados dinámicos,
- barra de progreso accesible mediante `role="progressbar"`.

---

# Responsive Design

La interfaz fue diseñada con enfoque responsive:

- una columna en dispositivos móviles,
- layout dividido en pantallas mayores.

---

# Manejo de estado

El estado de uploads fue centralizado mediante reducer/store para facilitar:

- trazabilidad de estados,
- predictibilidad,
- mantenimiento,
- manejo de acciones complejas asincrónicas.

## Parte A - Cuestionario

- 1 (src/types/file-descriptor-A.ts, src/utils/file-upload-A.ts)
  Utilicé discriminated unions en para modelar estados válidos del flujo de subida. El progreso solo existe en el estado "uploading", evitando inconsistencias mediante type narrowing, igual que error solo existe en el estado "error". Separé tipos y lógica utilitaria para mantener una arquitectura modular y escalable.

- 2 (src/utils/map-files-to-descriptors-A.ts)
  Utilicé Array.from para normalizar tanto FileList como File[] en una estructura iterable
  uniforme. La eliminación de duplicados se implementó mediante Map, usando name + size como clave compuesta y evitar uploads redundantes. Finalmente, se asigna un identificador con crypto.randomUUID() para facilitar rendering en React.

- 3 (src/utils/limit-concurrency-A)
  Implemente un patrón worker pool para limitar la cantidad de tareas concurrentes.
  Cada worker consume tareas compartiendo un índice global, mientras que el resultado se almacena usando el índice original para preservar el orden. Esto evita sobrecargar
  memoria y mejora la estabilidad frente a grandes volúmenes de operaciones async.
