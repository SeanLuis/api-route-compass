# Guía de Contribución

¡Gracias por tu interés en contribuir a API Route Compass! Esta guía te ayudará a entender el proceso para colaborar con nuestro proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Empezando](#empezando)
- [Proceso de Contribución](#proceso-de-contribución)
- [Estándares de Código](#estándares-de-código)
- [Informar Errores](#informar-errores)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Documentación](#documentación)
- [Revisión de Código](#revisión-de-código)

## Código de Conducta

Este proyecto sigue un [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código.

## Empezando

1. **Configura tu entorno de desarrollo**
   ```bash
   # Clona el repositorio
   git clone https://github.com/SeanLuis/api-route-compass.git
   cd api-route-compass
   
   # Instala dependencias
   npm install
   # o usando pnpm
   pnpm install
   ```

2. **Crea una rama para tu trabajo**
   ```bash
   git checkout -b feature/tu-nueva-caracteristica
   # o
   git checkout -b fix/el-error-que-corriges
   ```

## Proceso de Contribución

1. **Actualiza tu fork** con la última versión del repositorio principal antes de empezar a trabajar.
2. **Crea una rama** con un nombre descriptivo.
3. **Realiza tus cambios** siguiendo los estándares de código.
4. **Ejecuta las pruebas** para asegurarte de que nada se rompe.
5. **Envía tu Pull Request** con una descripción clara de los cambios y su propósito.

## Estándares de Código

- Sigue el estilo de código existente
- Usa nombres descriptivos para variables y funciones
- Comenta el código cuando sea necesario, especialmente en lógica compleja
- Asegúrate de que tus cambios pasen el linter (`npm run lint`)
- Mantén las líneas razonablemente cortas (generalmente menos de 100 caracteres)

## Informar Errores

Al informar errores, por favor incluye:

- Una descripción clara del problema
- Pasos detallados para reproducirlo
- Entorno en el que ocurre (navegador, sistema operativo, etc.)
- Capturas de pantalla o registros si es posible
- Posible solución si la conoces

## Sugerir Mejoras

Las sugerencias de mejora son bienvenidas:

- Describe claramente la mejora y sus beneficios
- Explica cómo se implementaría
- Considera las implicaciones para usuarios existentes
- Menciona si estás dispuesto a implementar la mejora tú mismo

## Documentación

La documentación es tan importante como el código:

- Actualiza la documentación cuando cambies el código
- Usa lenguaje claro y conciso
- Incluye ejemplos cuando sea apropiado
- Revisa la ortografía y gramática

## Revisión de Código

- Todas las contribuciones serán revisadas por los mantenedores
- Sé receptivo a los comentarios y sugerencias
- Haz cambios solicitados de manera oportuna
- Mantén la discusión técnica y respetuosa

---

¡Esperamos tus contribuciones y agradecemos tu ayuda para mejorar API Route Compass! 