

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

✅ **Implementar accesibilidad web completa**  
- Uso de roles ARIA semánticos
- Atributos aria-label y aria-labelledby
- Soporte para lectores de pantalla
- Navegación por teclado optimizada
- Cumplimiento de WCAG 2.1


------------------------------------------------------------------------------------------------------------------------------


## 3. Tecnologías Utilizadas

### Frontend

HTML5                    --> Estructura semántica de la aplicación 
CSS3                     --> Estilos, layout responsive y animaciones 
JavaScript               --> Lógica de la aplicación y AJAX
Accesibilidad Aria/Roles --> Atributos ARIA para mejorar accesibilidad 

### Formato de Datos

JSON        --> Almacenamiento y transmisión de datos de productos 

### Herramientas de Desarrollo

Visual Studio Code  --> Editor de código 
Live Server         --> Servidor local para desarrollo 
Google Chrome       -->DevTools  Depuración y testing 


------------------------------------------------------------------------------------------------------------------------------


## 4. Estructura del Proyecto
```
MMCTECH/
├── index.html                          # Página principal del proyecto
├── memoria.md                          # Esta documentación
├── README.md                           # Instrucciones y presentación
│
└── cliente/
    ├── paginas/
    │   └── productos.html             # Catálogo con funcionalidad AJAX ⭐
    │
    └── recursos/
        ├── css/
        │   ├── variables.css          # Variables globales (colores, tipografías, espaciados)
        │   ├── reset.css              # Normalización de estilos
        │   ├── layout.css             # Estructura general (header, footer, grid)
        │   ├── componentes.css        # Componentes reutilizables (botones, cards, alertas)
        │   └── styles.css             # Estilos específicos de index.html
        │
        ├── js/
        │   ├── config.js              # Configuración global (constantes, URLs)
        │   ├── api.js                 # Funciones para peticiones AJAX
        │   └── productos.js           # Lógica principal del catálogo ⭐
        │
        ├── imagenes/
        │   └── productos/             # 20 imágenes reales de productos gaming
        │       ├── raton-logitech-g502.jpg
        │       ├── raton-razer-deathadder.jpg
        │       ├── teclado-corsair-k70.jpg
        │       ├── auriculares-hyperx-cloud.jpg
        │       ├── monitor-asus-vg27aq.jpg
        │       └── ... (15 imágenes más)
        │
        └── datos/
            └── productos-simulados.json  # 20 productos con datos completos
```

### Descripción de Archivos Principales

#### HTML
- **`index.html`**: Página de inicio con presentación del proyecto y enlaces a la funcionalidad principal
- **`productos.html`**: Página del catálogo con la funcionalidad de carga dinámica mediante AJAX

#### CSS (Arquitectura Modular)
- **`variables.css`**: Define todas las variables CSS reutilizables (colores, tipografías, espaciados, sombras, etc.)
- **`reset.css`**: Normaliza estilos entre diferentes navegadores para consistencia visual
- **`layout.css`**: Define la estructura general (header, footer, grids, contenedores)
- **`componentes.css`**: Estilos de componentes reutilizables (botones, cards, formularios, alertas, spinners)
- **`styles.css`**: Estilos específicos para la página de inicio

#### JavaScript (Arquitectura Modular)
- **`config.js`**: Configuración global (número de productos por página, mensajes, constantes)
- **`api.js`**: Funciones para hacer peticiones AJAX (fetch, manejo de errores)
- **`productos.js`**: Lógica completa del catálogo (carga, renderizado, filtros, paginación, alertas) ⭐

#### Recursos Visuales
- **`imagenes/productos/`**: 20 imágenes reales de productos gaming en formato JPG/PNG
  - 6 ratones gaming
  - 5 teclados mecánicos
  - 5 auriculares gaming
  - 4 monitores gaming

#### Datos
- **`productos-simulados.json`**: Base de datos simulada con 20 productos completos (incluye nombre, descripción, precio, stock, categoría, marca, URL de imagen)


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

#### Gestión de Imágenes con Fallback
```javascript
/**
 * Las imágenes incluyen un fallback automático
 * Si la imagen no carga, se muestra un gradiente con el nombre de la marca
 */
<img src="${producto.url_imagen}" 
     alt="${producto.nombre}"
     onerror="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; 
              this.style.display='flex'; 
              this.style.alignItems='center'; 
              this.style.justifyContent='center'; 
              this.style.color='white'; 
              this.innerHTML='${producto.marca}';"
     loading="lazy">
```

**Beneficios:**
- Si falla la carga de una imagen, se muestra un gradiente elegante
- El atributo `loading="lazy"` mejora el rendimiento (carga diferida)
- Siempre hay contenido visual, nunca un icono roto

---

#### Alertas para Funciones No Disponibles
```javascript
/**
 * Muestra mensajes informativos cuando se intenta acceder
 * a funciones no implementadas (Carrito, Mi Cuenta)
 */
function mostrarFuncionNoDisponible(nombreFuncion) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-info';
    alerta.style.position = 'fixed';
    alerta.style.top = '100px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '1000';
    
    alerta.innerHTML = `
        <strong>Función no disponible</strong>
        <p>"${nombreFuncion}" no está disponible en este prototipo.</p>
    `;
    
    document.body.appendChild(alerta);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => alerta.remove(), 4000);
}
```

**Beneficio:** El usuario recibe feedback claro cuando intenta usar funcionalidades no implementadas, evitando confusión o errores.


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



---

### ✅ Práctica 6: Feedback de Funciones No Disponibles

**Descripción:**  
En lugar de enlaces rotos o errores, se muestra un mensaje claro cuando el usuario intenta acceder a funcionalidades no implementadas.

**Implementación:**

Funciones no implementadas en el prototipo:
- **Carrito de compra**: Click en el icono del carrito
- **Mi cuenta / Login**: Click en el icono de usuario

En lugar de romper la aplicación o mostrar páginas vacías, se muestra una alerta informativa:
```javascript
function mostrarFuncionNoDisponible(nombreFuncion) {
    // Crea una alerta temporal con el mensaje
    alerta.innerHTML = `
        <strong>Función no disponible</strong>
        <p>"${nombreFuncion}" no está disponible en este prototipo.<br>
        Esta es una demostración de carga dinámica con AJAX.</p>
    `;
}
```

**En el HTML:**
```html
<a href="#" onclick="mostrarFuncionNoDisponible('Carrito'); return false;">
    🛒 Carrito
</a>
```

**Beneficios:**
- ✅ El usuario sabe inmediatamente que la función existe pero no está implementada
- ✅ Se explica el contexto (es un prototipo educativo)
- ✅ No hay errores 404 o páginas rotas
- ✅ Experiencia profesional y transparente

---

### ✅ Práctica 7: Imágenes Reales con Fallback Automático

**Descripción:**  
Se utilizan imágenes reales de productos, pero con un sistema de respaldo elegante si alguna imagen falla.

**Implementación:**

Todas las imágenes de productos incluyen:

1. **Ruta a imagen real:** `../recursos/imagenes/productos/raton-logitech-g502.jpg`

2. **Fallback automático con `onerror`:**
```javascript
onerror="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; 
         this.innerHTML='${producto.marca}';"
```

3. **Lazy loading:**
```html
loading="lazy"
```

**Beneficios:**
- ✅ Si una imagen no carga, se muestra un gradiente elegante con el nombre de la marca
- ✅ Nunca se ve el icono de "imagen rota" (❌🖼️)
- ✅ Las imágenes se cargan solo cuando son visibles (mejor performance)
- ✅ Experiencia visual consistente

**Ejemplo visual:**

**Con imagen:**
```
┌──────────────┐
│              │
│   [IMAGEN]   │
│   PRODUCTO   │
│              │
└──────────────┘
```

**Sin imagen (fallback):**
```
┌──────────────┐
│  ┌────────┐  │
│  │Logitech│  │  ← Gradiente + marca
│  └────────┘  │
└──────────────┘
```

---

### ✅ Práctica 8: Accesibilidad Web con ARIA

**Descripción:**  
Implementación completa de atributos ARIA para mejorar la accesibilidad del sitio web.

**Implementación:**

#### Roles Semánticos:
```html
<header role="banner">           <!-- Encabezado principal -->
<main role="main">               <!-- Contenido principal -->
<nav aria-label="...">           <!-- Navegación -->
<footer role="contentinfo">      <!-- Información del sitio -->
<section aria-labelledby="..."> <!-- Secciones con títulos -->
```

#### Atributos para Navegación:
```html
<!-- Página actual -->
<a href="index.html" aria-current="page">Inicio</a>

<!-- Enlaces descriptivos -->
<a href="productos.html" aria-label="Ver catálogo completo de productos gaming">

<!-- Botones de acción -->
<button aria-label="Cargar más productos">Cargar Más</button>
```

#### Filtros Interactivos:
```html
<!-- Estado de filtros (pressed/not pressed) -->
<button aria-pressed="true">Todos</button>
<button aria-pressed="false">Ratones</button>

<!-- Menú móvil expandible -->
<button aria-expanded="false" aria-controls="navLinks">☰</button>
```

#### Contenido Dinámico:
```html
<!-- Anuncios suaves de cambios -->
<div aria-live="polite" role="status">
    Mostrando 12 de 20 productos
</div>

<!-- Alertas importantes -->
<div role="alert" aria-live="assertive">
    Error al cargar productos
</div>
```

#### Elementos Decorativos:
```html
<!-- Ocultar emojis de lectores de pantalla -->
<span aria-hidden="true">🛒</span>
<span aria-hidden="true">€</span>
```

#### Cards de Productos:
```javascript
// Productos dinámicos con información completa
card.setAttribute('aria-label', `${producto.nombre} - ${producto.precio} euros`);

// Imágenes descriptivas
alt="Imagen de Logitech G502 HERO"

// Botones con contexto
aria-label="Añadir Logitech G502 HERO al carrito"
```

**Código JavaScript para ARIA Dinámico:**
```javascript
// Actualizar aria-pressed en filtros
function filtrarPorCategoria(categoria) {
    filtrosBotones.forEach(btn => {
        if (btn.dataset.categoria === categoria) {
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// Actualizar aria-expanded en menú móvil
menuToggle.addEventListener('click', function() {
    const isExpanded = navLinks.classList.toggle('activo');
    menuToggle.setAttribute('aria-expanded', isExpanded);
});
```

**Beneficios:**
- ♿ **Accesible para todos:** Personas con discapacidades visuales pueden navegar con lectores de pantalla
- ⌨️ **Navegación por teclado:** Todo es accesible sin mouse
- 📢 **Feedback auditivo:** Anuncios claros de cambios en la página
- 🎯 **Mejor SEO:** Los motores de búsqueda entienden mejor la estructura
- ✅ **Cumplimiento legal:** Cumple con WCAG 2.1 (Web Content Accessibility Guidelines)
- 🏆 **Código profesional:** Demuestra conocimiento de estándares web modernos

**Validación:**
- ✅ HTML validado con W3C Validator (0 errores)
- ✅ Navegación por teclado funcional
- ✅ Compatible con lectores de pantalla (NVDA, VoiceOver)



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
- Imágenes reales           --> Se cargan correctamente las 20 imágenes 
- Fallback de imágenes      --> Si una imagen falla, se muestra gradiente + marca 
- Lazy loading              --> Imágenes se cargan solo cuando son visibles 
- Alerta "Carrito"          --> Muestra mensaje informativo al hacer click 
- Alerta "Mi Cuenta"        --> Muestra mensaje informativo al hacer click 

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


---

### Problema 4: Gestión de Imágenes de Productos

**Descripción:**  
Necesidad de mostrar imágenes reales de productos en lugar de placeholders con gradientes CSS.

**Solución:**  
Se implementó un sistema de imágenes con fallback automático:

1. **Descarga de imágenes:** Se descargaron 20 imágenes reales de productos gaming
2. **Nomenclatura consistente:** Se renombraron con un patrón claro:
```
   raton-logitech-g502.jpg
   teclado-corsair-k70.jpg
   auriculares-hyperx-cloud.jpg
   monitor-asus-vg27aq.jpg
```

3. **Estructura organizada:**
```
   cliente/recursos/imagenes/productos/
```

4. **Fallback automático:** Se agregó el atributo `onerror` para mostrar un gradiente si la imagen falla:
```javascript
   onerror="this.style.background='linear-gradient(...)'; this.innerHTML='Marca';"
```

5. **Optimización:** Se agregó `loading="lazy"` para carga diferida

---

### Problema 5: Enlaces a Funciones No Implementadas

**Descripción:**  
Los iconos de "Carrito" y "Mi Cuenta" en el header apuntaban a páginas que no existen, causando errores 404.

**Solución:**  
Se implementó un sistema de alertas informativas:

1. **Cambio de enlaces:**
```html
   <!-- Antes (error 404) -->
   <a href="carrito.html">🛒</a>
   
   <!-- Después (mensaje informativo) -->
   <a href="#" onclick="mostrarFuncionNoDisponible('Carrito'); return false;">🛒</a>
```

2. **Función JavaScript:**
```javascript
   function mostrarFuncionNoDisponible(nombreFuncion) {
       // Muestra alerta temporal con mensaje claro
   }
```

3. **Estilo de alerta:**
   - Posición fija (top-right)
   - Auto-desaparece después de 4 segundos
   - Animación de salida suave
   - Diseño consistente con el proyecto

**Beneficio:** Experiencia de usuario profesional, sin enlaces rotos ni confusión.



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
- **Accesibilidad Web**: ARIA roles, labels, live regions, navegación por teclado
- **Validación HTML**: Uso de W3C Validator, corrección de errores semánticos
- **Estándares Web**: WCAG 2.1, mejores prácticas de accesibilidad

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


### Accesibilidad y ARIA

- **WAI-ARIA Overview**  
  https://www.w3.org/WAI/standards-guidelines/aria/

- **WCAG 2.1 Guidelines**  
  https://www.w3.org/WAI/WCAG21/quickref/

- **W3C Markup Validation Service**  
  https://validator.w3.org/

- **MDN - ARIA**  
  https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA

  
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