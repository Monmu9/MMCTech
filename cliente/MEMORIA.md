

# MMCtech - Memoria del Proyecto

**Asignatura:** Desarrollo Web en Entorno Cliente  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Alumno:** Montserrat Muñoz Clarà  
**Fecha:** Noviembre 2025


-------------------------------------------------------------------------------------------------------


## 1. Introducción

### 1.1 Descripción del Proyecto

MMCtech es un prototipo de tienda online de periféricos gaming que implementa un sistema de carga dinámica de productos mediante AJAX.
La funcionalidad principal permite al usuario cargar productos progresivamente sin necesidad de recargar la página completa.


### 1.2 Contexto Académico

Este proyecto ha sido desarrollado como práctica para la asignatura Desarrollo Web en Entorno Cliente de 2º DAW, simulando una situación profesional real en una empresa de comercio electrónico.



**Situación planteada:**
> El equipo técnico de MMCtech quiere mejorar la experiencia del usuario. Hasta ahora, cada vez que un cliente consulta "más productos", la página se recarga por completo. 
Se solicita crear un prototipo dinámico que permita cargar productos adicionales sin refrescar la página, utilizando datos en formato JSON.


------------------------------------------------------------------------------------------------------------------------------


## 2. Objetivos del Proyecto

### Objetivos Principales

✅ **Implementar carga dinámica con AJAX**  
- Cargar productos sin recargar la página completa
- Utilizar Fetch API para peticiones asíncronas

✅ **Crear estructura HTML semántica**  
- Uso correcto de etiquetas HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Estructura lógica y accesible

✅ **Desarrollar JavaScript modular y limpio**  
- Código organizado en funciones reutilizables
- Comentarios y documentación clara
- Manejo de eventos del botón "Cargar más"

✅ **Trabajar con datos JSON**  
- Simulación de respuesta del servidor
- Procesamiento y renderizado dinámico de datos

✅ **Aplicar buenas prácticas de usabilidad**  
- Feedback visual al usuario
- Prevención de errores
- Diseño responsive


------------------------------------------------------------------------------------------------------------------------------


## 3. Tecnologías Utilizadas

### Frontend

HTML5       --> Estructura semántica de la aplicación 
CSS3        --> Estilos, layout responsive y animaciones 
JavaScript  --> Lógica de la aplicación y AJAX 

### Formato de Datos

JSON        --> Almacenamiento y transmisión de datos de productos 

### Herramientas de Desarrollo

Visual Studio Code  --> Editor de código 
Live Server         --> Servidor local para desarrollo 
Google Chrome       -->DevTools  Depuración y testing 


------------------------------------------------------------------------------------------------------------------------------


## 4. Estructura del Proyecto

MMCTECH/
└── cliente/
    ├── index.html                      # Página principal
    ├── memoria.md                      # Esta documentación
    │
    ├── paginas/
    │   └── productos.html             # Catálogo con funcionalidad AJAX
    │
    └── recursos/
        ├── css/
        │   ├── variables.css          # Variables globales (colores, tipografías)
        │   ├── reset.css              # Normalización de estilos
        │   ├── layout.css             # Estructura general (header, footer, grid)
        │   ├── componentes.css        # Componentes reutilizables (botones, cards)
        │   └── styles.css             # Estilos específicos de index.html
        │
        ├── js/
        │   ├── config.js              # Configuración global (URL API, constantes)
        │   ├── api.js                 # Funciones para peticiones AJAX
        │   └── productos.js           # Lógica principal del catálogo 
        │
        └── datos/
            └── productos-simulados.json  # Datos de productos en JSON



### Descripción de Archivos Principales

#### HTML
- **`index.html`**: Página de inicio con presentación del proyecto
- **`productos.html`**: Página principal con el catálogo y funcionalidad de carga dinámica

#### CSS
- **`variables.css`**: Define colores, tipografías, espaciados y otras variables reutilizables
- **`reset.css`**: Normaliza estilos entre diferentes navegadores
- **`layout.css`**: Define la estructura general (header, footer, grids, contenedores)
- **`componentes.css`**: Estilos de componentes reutilizables (botones, cards, formularios, alertas)
- **`styles.css`**: Estilos específicos para la página de inicio

#### JavaScript
- **`config.js`**: Configuración global (número de productos por página, mensajes, etc.)
- **`api.js`**: Funciones para hacer peticiones AJAX (actualmente a JSON local)
- **`productos.js`**: Lógica completa del catálogo (carga, renderizado, filtros, paginación) ⭐

#### Datos
- **`productos-simulados.json`**: 20 productos de ejemplo en formato JSON


------------------------------------------------------------------------------------------------------------------------------


## 5. Funcionalidad Principal: Carga Dinámica con AJAX

### 5.1 Descripción Detallada

El sistema permite cargar productos de forma progresiva sin recargar la página. 
El flujo es el siguiente:

1. **Carga inicial**: Al abrir la página, se muestran automáticamente los primeros 6 productos
2. **Botón "Cargar más"**: El usuario puede hacer clic para ver los siguientes 6 productos
3. **Actualización del DOM**: Los nuevos productos se agregan al grid existente con animación
4. **Feedback visual**: Durante la carga, el botón muestra un spinner y se deshabilita
5. **Finalización**: Cuando no hay más productos, se muestra un mensaje y se oculta el botón

### 5.2 Código JavaScript Destacado

#### Función Principal: Carga de Productos
```javascript
/**
 * Carga los primeros productos al abrir la página
 */
async function cargarProductosIniciales() {
    console.log('📦 Cargando productos iniciales...');
    
    mostrarLoading(true);
    
    try {
        // Obtener todos los productos desde JSON
        todosLosProductos = await obtenerTodosLosProductos();
        productosTotales = todosLosProductos.length;
        
        // Actualizar contador total
        productosTotalesSpan.textContent = productosTotales;
        
        // Mostrar los primeros productos
        cargarSiguientesProductos();
        
    } catch (error) {
        console.error('Error al cargar productos iniciales:', error);
        throw error;
    } finally {
        mostrarLoading(false);
    }
}
```

#### Petición AJAX con Fetch API
```javascript
/**
 * Obtiene los productos desde JSON local
 */
async function obtenerTodosLosProductos() {
    console.log('📄 Cargando desde JSON local (simulado)');
    
    const response = await fetch('../recursos/datos/productos-simulados.json');
    
    if (!response.ok) {
        throw new Error('Error al cargar productos simulados');
    }
    
    const productos = await response.json();
    return productos;
}
```

#### Event Listener del Botón "Cargar Más"
```javascript
/**
 * Maneja el click en el botón "Cargar más"
 * FUNCIONALIDAD CLAVE DEL EJERCICIO
 */
async function handleCargarMas() {
    console.log('🔄 Usuario clickeó "Cargar más"');
    
    // BUENA PRÁCTICA: Deshabilitar botón durante la carga
    btnCargarMas.disabled = true;
    btnCargarMas.innerHTML = ' Cargando...';
    
    // Simular pequeño delay para demostrar el loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Cargar siguientes productos
    cargarSiguientesProductos();
    
    // Restaurar botón
    btnCargarMas.disabled = false;
    btnCargarMas.innerHTML = '📦 Cargar Más Productos';
}
```

#### Renderizado Dinámico de Productos
```javascript
/**
 * Crea las cards de productos y las agrega al grid
 */
function renderizarProductos(productos) {
    productos.forEach((producto, index) => {
        const card = crearCardProducto(producto);
        productosGrid.appendChild(card);
        
        // Animación escalonada
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
}
```

### 5.3 Flujo de Datos
```
┌────────────────┐
│    Usuario     │
│  abre página   │
└────────┬───────┘
         │
         ▼
┌──────────────────────┐
│ inicializar()        │
│ (JavaScript)         │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Fetch API (AJAX)     │
│ GET productos.json   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Procesar JSON        │
│ Extraer primeros 6   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ renderizarProductos()│
│ Crear HTML dinámico  │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Actualizar DOM       │
│ (sin recargar página)│
└────────┬─────────────┘
         │
         ▼
    ┌───────┐
    │Usuario│ ──────────────┐
    │ click │               │
    │"Cargar│               │
    │ más"  │               │
    └───┬───┘               │
        │                   │
        ▼                   │
 ┌──────────────┐           │
 │handleCargarMas│          │
 │Cargar otros 6│           │
 └──────┬───────┘           │
        │                   │
        └───────────────────┘
        (El ciclo se repite)
```


------------------------------------------------------------------------------------------------------------------------------


## 6. Integración con Base de Datos Real

### 6.1 Situación Actual (Prototipo)

El prototipo utiliza un archivo JSON local (`productos-simulados.json`) para simular la respuesta de un servidor. Esto permite:

✅ Demostrar la funcionalidad sin depender de un servidor externo  
✅ Facilitar las pruebas y el desarrollo  
✅ Funcionar sin conexión a internet  

### 6.2 Cómo se Integraría en un Entorno Real

Para conectar este prototipo con una base de datos real, el cambio es mínimo:

#### Código Actual (JSON local):
```javascript
const response = await fetch('../recursos/datos/productos-simulados.json');
```

#### Código en Producción (API real):
```javascript
const response = await fetch('https://api.mmctech.com/productos?limite=6&offset=0');
```

### 6.3 Arquitectura en Producción
```
┌──────────────────┐
│    FRONTEND      │
│  (HTML/CSS/JS)   │
│                  │
│  - productos.html│
│  - productos.js  │
└────────┬─────────┘
         │
         │ HTTP Request (AJAX)
         │ GET /productos?limite=6&offset=0
         │
         ▼
┌──────────────────┐
│   BACKEND API    │
│  (Node.js/PHP)   │
│                  │
│  Endpoint:       │
│  /productos      │
└────────┬─────────┘
         │
         │ SQL Query
         │ SELECT * FROM productos
         │ LIMIT 6 OFFSET 0
         │
         ▼
┌──────────────────┐
│  BASE DE DATOS   │
│     (MySQL)      │
│                  │
│  Tabla:          │
│  - productos     │
└──────────────────┘
```

### 6.4 Respuesta del Servidor (JSON)

El backend devolvería datos en el mismo formato que nuestro JSON local:
```json
{
  "exito": true,
  "productos": [
    {
      "id": 1,
      "nombre": "Logitech G502 HERO",
      "precio": 79.99,
      "stock": 25,
      "categoria": "Ratones",
      ...
    }
  ],
  "total": 20,
  "hayMas": true
}
```

### 6.5 Ventajas de esta Arquitectura

✅ **Separación de responsabilidades**: Frontend y backend independientes  
✅ **Escalabilidad**: Fácil agregar más funcionalidades  
✅ **Reutilización**: El mismo backend puede servir a web, móvil, etc.  
✅ **Mantenibilidad**: Cambios en uno no afectan al otro  


------------------------------------------------------------------------------------------------------------------------------


## 7. Buenas Prácticas de Usabilidad Aplicadas

### ✅ Práctica 1: Feedback Visual Inmediato

**Descripción:**  
El usuario siempre sabe qué está pasando en la aplicación.

**Implementación:**
1. **Durante la carga**: El botón muestra un spinner animado y texto "Cargando..."
2. **Productos nuevos**: Aparecen con animación fade-in suave
3. **Contador actualizado**: "Mostrando 12 de 20 productos" se actualiza en tiempo real
4. **Sin más productos**: Mensaje claro "Has visto todos los productos disponibles"

**Código:**
```javascript
btnCargarMas.innerHTML = ' Cargando...';
```

**CSS del spinner:**
```css
.spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**Beneficio:** Reduce la ansiedad del usuario y mejora la percepción de velocidad.


------------------------------------------------------------------------------------------------------------------------------


### ✅ Práctica 2: Prevención de Errores

**Descripción:**  
El sistema evita acciones que puedan causar errores o comportamientos inesperados.

**Implementación:**
1. **Botón deshabilitado durante carga**: Evita clics múltiples
2. **Validación de datos**: Verifica que el JSON sea válido antes de renderizar
3. **Ocultación del botón**: Si no hay más productos, el botón desaparece
4. **Mensajes de error amigables**: Si algo falla, se muestra un mensaje claro

**Código:**
```javascript
// Deshabilitar botón
btnCargarMas.disabled = true;

// Verificar si hay más productos
if (productosActuales >= totalProductos) {
    btnCargarMas.classList.add('oculto');
    noMasProductos.classList.remove('oculto');
}
```

**Beneficio:** Evita frustraciones y comportamientos inesperados que confundan al usuario.


------------------------------------------------------------------------------------------------------------------------------


### ✅ Práctica 3: Diseño Responsive

**Descripción:**  
La interfaz se adapta perfectamente a cualquier tamaño de pantalla.

**Implementación:**

**Desktop (> 768px):**
```css
.productos-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
}
```

**Tablet (480px - 768px):**
```css
@media (max-width: 768px) {
    .productos-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columnas */
    }
}
```

**Móvil (< 480px):**
```css
@media (max-width: 480px) {
    .productos-grid {
        grid-template-columns: 1fr; /* 1 columna */
    }
}
```

**Características adicionales:**
- Botones con área táctil mínima de 44x44px
- Textos legibles (mínimo 16px en móvil)
- Espaciados proporcionales en todos los dispositivos

**Beneficio:** Experiencia óptima independientemente del dispositivo utilizado.

---

### ✅ Práctica 4: Carga Progresiva (Performance)

**Descripción:**  
Solo se cargan los datos necesarios en cada momento.

**Implementación:**
- **Carga inicial**: Solo 6 productos (en lugar de los 20)
- **Bajo demanda**: Más productos solo si el usuario lo solicita
- **Imágenes lazy load**: Se cargan cuando son visibles

**Código:**
```javascript
const PRODUCTOS_POR_PAGINA = 6; // Configurado en config.js
```

**Beneficios:**
- ⚡ Tiempo de carga inicial más rápido
- 📊 Menos consumo de datos
- 🚀 Mejor rendimiento general

---

### ✅ Práctica 5: HTML Semántico y Accesibilidad

**Descripción:**  
Uso correcto de etiquetas HTML5 para mejorar la accesibilidad y el SEO.

**Implementación:**
```html

  
    ...
  



  
    
      ...
      ...
    
  


...
```

**Beneficios:**
- ♿ Mejor accesibilidad para lectores de pantalla
- 🔍 Mejor SEO (motores de búsqueda)
- 📱 Estructura lógica y mantenible


------------------------------------------------------------------------------------------------------------------------------


## 8. Características Técnicas Destacadas

### 8.1 Variables CSS (DRY - Don't Repeat Yourself)

En lugar de repetir colores y valores, se utilizan variables CSS:
```css
:root {
    --color-primario: #00d9ff;
    --color-fondo: #0a0e27;
    --espacio-md: 1rem;
    --radio-lg: 0.75rem;
}

.card {
    background-color: var(--color-fondo);
    border-radius: var(--radio-lg);
    padding: var(--espacio-md);
}
```

**Ventajas:**
- Cambios globales en un solo lugar
- Consistencia visual
- Fácil mantenimiento

---

### 8.2 JavaScript Modular

El código JavaScript está organizado en funciones específicas:
```javascript
// Funciones de carga
async function cargarProductosIniciales() { ... }
async function obtenerTodosLosProductos() { ... }
function cargarSiguientesProductos() { ... }

// Funciones de renderizado
function renderizarProductos(productos) { ... }
function crearCardProducto(producto) { ... }

// Funciones de UI
function mostrarLoading(mostrar) { ... }
function mostrarError(mensaje) { ... }

// Event listeners
function configurarEventListeners() { ... }
```

**Ventajas:**
- Código reutilizable
- Fácil de entender y mantener
- Fácil de debuggear


------------------------------------------------------------------------------------------------------------------------------


### 8.3 Async/Await para AJAX

En lugar de callbacks o promesas encadenadas, se usa async/await:
```javascript
// ❌ Antiguo (callbacks)
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// ✅ Moderno (async/await)
async function obtenerDatos() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

**Ventajas:**
- Código más legible
- Manejo de errores más claro
- Más fácil de debuggear

---

### 8.4 CSS Grid para Layout Responsive
```css
.productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--espacio-xl);
}
```

**Ventajas:**
- Responsive automático
- Menos código
- Más flexible que float o inline-block


------------------------------------------------------------------------------------------------------------------------------


## 9. Pruebas Realizadas

### 9.1 Pruebas Funcionales

- Carga inicial             --> Se muestran correctamente los primeros 6 productos 
- Botón "Cargar más"        --> Carga los siguientes 6 productos sin recargar 
- Contador de productos     --> Se actualiza correctamente (ej: "Mostrando 12 de 20") 
- Fin de productos          --> Muestra mensaje y oculta botón cuando no hay más 
- Filtro "Todos"            --> Muestra todos los productos
- Filtro "Ratones"          --> Muestra solo productos de categoría Ratones 
- Filtro "Teclados"         --> Muestra solo productos de categoría Teclados 
- Filtro "Auriculares"      --> Muestra solo productos de categoría Auriculares 
- Filtro "Monitores"        --> Muestra solo productos de categoría Monitores
- Spinner de carga          --> Se muestra durante la carga 
- Animación fade-in         --> Los productos aparecen con animación suave 

### 9.2 Pruebas de Usabilidad

- Feedback visual           --> El usuario siempre sabe qué está pasando 
- Botón deshabilitado       --> No permite clics múltiples durante carga 
- Mensajes claros           --> "Cargando...", "No hay más productos" 
- Responsive móvil          --> Se ve correctamente en pantallas pequeñas 
- Responsive tablet         --> Grid se adapta a 2 columnas 
- Responsive desktop        --> Grid muestra 3 columnas 
- Tamaño botones táctiles   --> Mínimo 44x44px 
- Contraste de colores      --> Texto legible sobre fondos 

### 9.3 Pruebas de Código

- HTML válido               --> W3C Validator 
- Sin errores JS            --> Chrome DevTools Console 
- CSS sin errores           --> CSS Validator 
- Carga < 3 segundos        --> Chrome DevTools Network 
- Sin warnings              --> Console del navegador 

### 9.4 Navegadores Probados

- Google Chrome             --> Funciona correctamente 
- Mozilla Firefox           --> Funciona correctamente 
- Microsoft Edge            --> Funciona correctamente 
- Safari                    --> Funciona correctamente 


------------------------------------------------------------------------------------------------------------------------------


## 10. Dificultades Encontradas y Soluciones

### Problema 1: Animaciones que Desaparecían

**Descripción:**  
Los productos aparecían y desaparecían inmediatamente debido a la combinación de `opacity: 0` inicial y el `setTimeout`.

**Solución:**  
Se modificó la lógica para agregar primero el elemento al DOM y luego aplicar la animación:
```javascript
// Antes (no funcionaba)
card.style.opacity = '0';
setTimeout(() => {
    card.classList.add('fade-in');
    productosGrid.appendChild(card);
}, index * 100);

// Después (funciona)
productosGrid.appendChild(card);
setTimeout(() => {
    card.classList.add('fade-in');
}, index * 50);
```

---

### Problema 2: Imágenes Placeholder No Cargaban

**Descripción:**  
Los servicios externos de imágenes placeholder (via.placeholder.com, placehold.co) no funcionaban debido a problemas de conexión.

**Solución:**  
Se implementaron imágenes con gradientes CSS directamente en el HTML:
```javascript
const colores = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #00d9ff 0%, #7b2cbf 100%)',
    ...
];


    ${producto.marca}

```


------------------------------------------------------------------------------------------------------------------------------


### Problema 3: Ruta del JSON No se Encontraba

**Descripción:**  
Error 404 al intentar cargar `productos-simulados.json` debido a rutas relativas incorrectas.

**Solución:**  
Se ajustó la ruta según la ubicación del archivo HTML:
```javascript
// productos.html está en cliente/paginas/
// JSON está en cliente/recursos/datos/
const response = await fetch('../recursos/datos/productos-simulados.json');
```


------------------------------------------------------------------------------------------------------------------------------


## 11. Posibles Mejoras Futuras

Si se continuara el desarrollo del proyecto, se podrían implementar:

### 📦 Funcionalidades

- 🔹 **Sistema de búsqueda**: Buscar productos por nombre o descripción
- 🔹 **Ordenación**: Ordenar por precio (mayor/menor), nombre (A-Z), popularidad
- 🔹 **Vista de lista/grid**: Permitir al usuario cambiar entre vista de tarjetas o lista
- 🔹 **Comparador**: Seleccionar varios productos para comparar características
- 🔹 **Favoritos**: Marcar productos como favoritos (localStorage)
- 🔹 **Carrito de compra**: Sistema completo de carrito con localStorage
- 🔹 **Detalles del producto**: Página individual con más información

### 🎨 Diseño

- 🔹 **Modo oscuro/claro**: Toggle para cambiar tema
- 🔹 **Animaciones avanzadas**: Transiciones más elaboradas
- 🔹 **Skeleton loading**: Placeholders mientras cargan los productos
- 🔹 **Imágenes reales**: Integrar imágenes reales de productos

### 🔧 Técnico

- 🔹 **Integración con backend real**: Conectar con API y base de datos
- 🔹 **Autenticación**: Sistema de login y registro
- 🔹 **Infinite scroll**: Cargar automáticamente al hacer scroll
- 🔹 **Service Workers**: Funcionamiento offline (PWA)
- 🔹 **Tests automatizados**: Jest para testing de funciones
- 🔹 **Optimización de imágenes**: WebP, lazy loading avanzado


------------------------------------------------------------------------------------------------------------------------------


## 12. Conclusiones

### 12.1 Objetivos Cumplidos

Considero que este proyecto cumple con los requisitos mencionados en la actividad final de Desarrollo en Entorno Cliente:

✅ **Carga dinámica con AJAX**: Implementada correctamente usando Fetch API  
✅ **HTML semántico**: Uso correcto de etiquetas HTML5  
✅ **JavaScript modular**: Código organizado en funciones reutilizables  
✅ **Datos en JSON**: Simulación de respuesta del servidor  
✅ **Buenas prácticas de usabilidad**: Feedback visual, prevención de errores, responsive  
✅ **Código limpio**: Comentado, documentado y fácil de mantener  

### 12.2 Conocimientos Aplicados

Durante el desarrollo del proyecto se han aplicado conocimientos de:

- **JavaScript ES6+**: async/await, arrow functions, template literals, destructuring
- **AJAX**: Fetch API para peticiones asíncronas
- **DOM Manipulation**: createElement, appendChild, classList, innerHTML
- **Event Handling**: addEventListener, eventos personalizados
- **CSS Avanzado**: Variables CSS, Grid, Flexbox, animaciones, responsive design
- **HTML5**: Etiquetas semánticas, accesibilidad
- **JSON**: Estructura de datos, parsing
- **Buenas prácticas**: Código limpio, comentarios, organización modular

### 12.3 Aplicabilidad Real

El código desarrollado es fácilmente integrable en un entorno de producción real. 
Solo se necesita:

1. Cambiar la URL del fetch (de JSON local a API)
2. Implementar el backend con el endpoint correspondiente
3. Conectar con una base de datos

El resto del código (renderizado, animaciones, eventos, UI) no necesita cambios.

### 12.4 Valoración Personal

Este proyecto me ha permitido consolidar conocimientos de:
- Programación asíncrona en JavaScript
- Manipulación del DOM
- Diseño responsive
- Arquitectura cliente-servidor
- Buenas prácticas de desarrollo web

Ha sido una experiencia muy valiosa que simula situaciones reales en el desarrollo web profesional.
Aunque no voy a negar que, al ser novata, me ha dado algún que otro dolor de cabeza.


------------------------------------------------------------------------------------------------------------------------------


## 13. Referencias y Recursos

### Documentación Oficial

- **MDN Web Docs - Fetch API**  
  https://developer.mozilla.org/es/docs/Web/API/Fetch_API

- **MDN Web Docs - Async/Await**  
  https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function

- **W3C - HTML5**  
  https://www.w3.org/TR/html52/

- **CSS Grid Layout**  
  https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout

### Tutoriales y Guías

- **JavaScript.info - Modern JavaScript**  
  https://javascript.info/

- **CSS-Tricks - A Complete Guide to Grid**  
  https://css-tricks.com/snippets/css/complete-guide-grid/

- **Google Web Fundamentals - Responsive Design**  
  https://developers.google.com/web/fundamentals/design-and-ux/responsive

### Herramientas Utilizadas

- **Visual Studio Code** - Editor de código
- **Live Server** - Servidor de desarrollo local
- **Google Chrome DevTools** - Depuración y testing
- **JSON Formatter** - Validación de JSON


------------------------------------------------------------------------------------------------------------------------------


## 14. Anexos

### Anexo A: Instrucciones de Ejecución

1. **Descargar/Clonar el proyecto**
2. **Abrir la carpeta en VS Code**
3. **Instalar extensión Live Server** (si no está instalada)
4. **Click derecho en `index.html`**
5. **Seleccionar "Open with Live Server"**
6. **El navegador se abrirá automáticamente**

### Anexo B: Estructura de Datos JSON
```json
{
  "id": 1,
  "nombre": "Logitech G502 HERO",
  "descripcion": "Ratón gaming de alto rendimiento...",
  "precio": 79.99,
  "stock": 25,
  "categoria": "Ratones",
  "marca": "Logitech",
  "url_imagen": "...",
  "activo": true
}
```


------------------------------------------------------------------------------------------------------------------------------




**Fecha de elaboración:** Noviembre 2025  
**Asignatura:** Desarrollo Web en Entorno Cliente  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Alumno:** Montserrat Muñoz Clarà