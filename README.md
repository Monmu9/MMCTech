

# MMCtech - Tienda Gaming

Proyecto de Desarollo Web en Entorno Cliente - 2º DAW

Sistema de catálogo de productos con carga dinámica mediante AJAX.


-------------------------------------------------------------------------------------------------------------


## 🌐 Ver Proyecto en Vivo

👉 **[Ver Demo en GitHub Pages](https://Monmu9.github.io/mmctech/)**


-------------------------------------------------------------------------------------------------------------


## 📋 Descripción

Tienda online de periféricos gaming que implementa:

- ⚡ Carga dinámica de productos con AJAX (sin recargar página)
- 📦 Paginación progresiva con botón "Cargar más"
- 🖼️ Imágenes reales de productos gaming
- 🎨 Diseño responsive adaptado a móvil, tablet y desktop
- 🏷️ Filtros por categoría (Ratones, Teclados, Auriculares, Monitores)
- ✅ HTML5 semántico para mejor accesibilidad y SEO
- 🎯 JavaScript moderno (ES6+, async/await, Fetch API)
- 💫 Animaciones suaves y feedback visual
- 🔔 Alertas informativas para funciones no implementadas
- ♿ **Accesibilidad completa** con ARIA labels y roles (WCAG 2.1)


-------------------------------------------------------------------------------------------------------------


## 🖼️ Características Visuales

### Catálogo de Productos

- 20 productos gaming con imágenes reales
- Diseño de cards profesional con hover effects
- Información detallada: precio, stock, descripción
- Badges de categoría
- Gradiente de respaldo si falla la carga de imágenes

### Experiencia de Usuario

- Carga inicial de 6 productos
- Botón "Cargar más" con spinner animado
- Contador en tiempo real: "Mostrando X de 20 productos"
- Mensaje cuando no hay más productos
- Alertas amigables para funciones no disponibles


-------------------------------------------------------------------------------------------------------------


## 📖 Documentación

La **documentación técnica completa** del proyecto se encuentra en:

📄 **[MEMORIA.md](./memoria.md)**

Incluye:
- Explicación detallada de la funcionalidad AJAX
- Integración con base de datos real (cómo se haría)
- Buenas prácticas de usabilidad aplicadas
- Estructura del código y arquitectura
- Pruebas realizadas y resultados


-------------------------------------------------------------------------------------------------------------


## 🚀 Cómo Ejecutar Localmente

### Opción 1: Directamente en el Navegador

1. Descarga o clona el repositorio
2. Abre `index.html` directamente en tu navegador

### Opción 2: Con Live Server (Recomendado)

1. Abre el proyecto en **Visual Studio Code**
2. Instala la extensión **Live Server**
3. Click derecho en `index.html`
4. Selecciona **"Open with Live Server"**

Esto evita problemas de CORS al cargar el archivo JSON local.

---

## 📂 Estructura del Proyecto
```
MMCTECH/
├── index.html                    # Página principal del proyecto
├── memoria.md                    # Documentación técnica completa
├── README.md                     # Este archivo
│
└── cliente/
    ├── paginas/
    │   └── productos.html       # Catálogo con funcionalidad AJAX ⭐
    │
    └── recursos/
        ├── css/
        │   ├── variables.css    # Variables globales (colores, tipografías)
        │   ├── reset.css        # Normalización de estilos
        │   ├── layout.css       # Estructura (header, footer, grid)
        │   ├── componentes.css  # Botones, cards, alertas, etc.
        │   └── styles.css       # Estilos específicos de index.html
        │
        ├── js/
        │   ├── config.js        # Configuración global
        │   ├── api.js           # Funciones AJAX
        │   └── productos.js     # Lógica principal del catálogo ⭐
        │
        ├── imagenes/
        │   └── productos/       # Imágenes reales de productos (20 imgs)
        │
        └── datos/
            └── productos-simulados.json  # Base de datos simulada
```


-------------------------------------------------------------------------------------------------------------


## 🎯 Funcionalidad Destacada: Carga Dinámica con AJAX

### Sin AJAX (tradicional):
```
Usuario → Click "Ver más" → Página RECARGA COMPLETA → Nuevos productos
❌ Experiencia lenta
❌ Se pierde el scroll
❌ Parpadeo de pantalla
```

### Con AJAX (este proyecto):
```
Usuario → Click "Cargar más" → Petición en segundo plano → Nuevos productos se AÑADEN
✅ Experiencia fluida
✅ Se mantiene el scroll
✅ Sin recargas
```


-------------------------------------------------------------------------------------------------------------


## 🛠️ Tecnologías Utilizadas

Frontend                --> HTML5, CSS3, JavaScript ES6+ 
Peticiones Asíncronas   --> Fetch API (AJAX) 
Datos                   --> JSON 
Diseño                  --> CSS Grid, Flexbox, Variables CSS 
Animaciones             --> CSS Transitions & Keyframes 
Control de Versiones    --> Git & GitHub 
Deployment              --> GitHub Pages 


-------------------------------------------------------------------------------------------------------------


## ✨ Características Técnicas

### HTML5 Semántico
```html
<header>, <nav>, <main>, <section>, <article>, <footer>
```
- Mejor accesibilidad
- Mejor SEO
- Código más legible

### CSS Modular
```
variables.css → Colores, espaciados, tipografías
reset.css → Normalización entre navegadores
layout.css → Estructura general
componentes.css → Elementos reutilizables
```

### JavaScript Modular
```javascript
// Funciones específicas para cada tarea
async function cargarProductosIniciales() { }
function renderizarProductos(productos) { }
function crearCardProducto(producto) { }
async function handleCargarMas() { }
```

### Accesibilidad (ARIA)
```html
role="banner", role="main", role="contentinfo"
aria-label, aria-labelledby, aria-current
aria-pressed (filtros), aria-expanded (menú)
aria-live="polite" (contenido dinámico)
aria-hidden="true" (decoraciones)
```
- Navegación por teclado optimizada
- Lectores de pantalla compatibles
- Cumple con WCAG 2.1
- Validado con W3C Validator

### Responsive Design
```css
Desktop (>768px)  → 3 columnas
Tablet (480-768px) → 2 columnas
Móvil (<480px)    → 1 columna
```


-------------------------------------------------------------------------------------------------------------


## 🎓 Contexto Académico

### Asignatura
**Desarrollo Web en Entorno Cliente** - 2º Desarrollo de Aplicaciones Web

### Objetivos Cumplidos

✅ Implementar carga dinámica con AJAX  
✅ Crear estructura HTML semántica  
✅ Desarrollar JavaScript modular y limpio  
✅ Trabajar con datos en formato JSON  
✅ Aplicar buenas prácticas de usabilidad  
✅ Diseño responsive y accesible  
✅ Implementar accesibilidad web con ARIA 
✅ Validación HTML sin errores (W3C)

### Situación Profesional Simulada

> Trabajas en MMCtech, una empresa de comercio electrónico. El equipo técnico quiere mejorar la experiencia del usuario: actualmente, cada vez que un cliente consulta "más productos", la página se recarga completamente. Tu tarea es crear un prototipo dinámico que permita cargar productos adicionales sin refrescar la página, utilizando datos en formato JSON.


-------------------------------------------------------------------------------------------------------------


## 🧪 Pruebas Realizadas

Carga inicial (6 productos) 
Botón "Cargar más" 
Animaciones fade-in 
Filtros por categoría 
Contador de productos 
Imágenes con fallback 
Alertas de funciones no disponibles 
Responsive móvil 
Responsive tablet 
Responsive desktop 


-------------------------------------------------------------------------------------------------------------


## 🌟 Posibles Mejoras Futuras

- Implementar backend real (Node.js + MySQL)
- Sistema de carrito funcional con localStorage
- Autenticación de usuarios
- Sistema de búsqueda en tiempo real
- Comparador de productos
- Wishlist / Favoritos
- Sistema de reseñas y valoraciones
- Integración con pasarela de pago (Stripe)
- Panel de administración


-------------------------------------------------------------------------------------------------------------



## 👨‍💻 Autor

**Montserrat Muñoz Clarà**  
2º Desarrollo de Aplicaciones Web  
Jobie FP


-------------------------------------------------------------------------------------------------------------


## 📅 Fecha

Noviembre 2025


-------------------------------------------------------------------------------------------------------------


## 📄 Licencia

Este proyecto es un trabajo académico desarrollado con fines educativos.


-------------------------------------------------------------------------------------------------------------


## 🙏 Agradecimientos

Profesores de la asignatura Entorno Cliente. Gracias Alejandro,


## 📞 Contacto

Para consultas sobre el proyecto:
- GitHub: [@Monmu9](https://github.com/Monmu9)
- Email: montsemc.dev@gmail.com


-------------------------------------------------------------------------------------------------------------


**⭐ Si te gusta el proyecto, dale una estrella en GitHub!**
