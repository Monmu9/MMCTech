


/**
 * ========================================
 * SISTEMA DE PRODUCTOS CON CARGA DINÁMICA
 * ========================================
 * 
 * FUNCIONALIDAD CLAVE DEL EJERCICIO:
 * - Cargar productos inicialmente
 * - Botón "Cargar más" que agrega productos sin recargar la página
 * - Uso de AJAX (fetch API)
 * - Datos desde JSON (simulado) o API real
 * - Feedback visual (loading, animaciones)
 * - Buenas prácticas de usabilidad
 */




// ========================================
// VARIABLES GLOBALES
// ========================================

let productosActuales = 0;  // Contador de productos mostrados
let productosTotales = 0;   // Total de productos disponibles
let todosLosProductos = []; // Array con todos los productos
let categoriaActual = 'todos'; // Categoría seleccionada
let usarDatosSimulados = true; // true = JSON local, false = API real



// ========================================
// ELEMENTOS DEL DOM
// ========================================

const productosGrid = document.getElementById('productosGrid');
const btnCargarMas = document.getElementById('btnCargarMas');
const loadingProductos = document.getElementById('loadingProductos');
const noMasProductos = document.getElementById('noMasProductos');
const productosInfo = document.getElementById('productosInfo');
const productosActualesSpan = document.getElementById('productosActuales');
const productosTotalesSpan = document.getElementById('productosTotal');
const filtrosBotones = document.querySelectorAll('.filtro-btn');



// ========================================
// FUNCIÓN PRINCIPAL: INICIALIZAR
// ========================================

/**
 * Inicializa la página de productos
 * Se ejecuta cuando el DOM está listo
 */
async function inicializar() {
    console.log('🚀 Iniciando sistema de productos...');
    
    try {
        // Cargar productos iniciales
        await cargarProductosIniciales();
        
        // Configurar event listeners
        configurarEventListeners();
        
        console.log('✅ Sistema de productos iniciado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
        mostrarError('Error al cargar los productos. Por favor, recarga la página.');
    }
}




// ========================================
// CARGAR PRODUCTOS INICIALES
// ========================================

/**
 * Carga los primeros productos al abrir la página
 */
async function cargarProductosIniciales() {
    console.log('📦 Cargando productos iniciales...');
    
    mostrarLoading(true);
    
    try {
        // Obtener todos los productos (simulados o de API)
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




// ========================================
// OBTENER PRODUCTOS (Simulados o API Real)
// ========================================

/**
 * Obtiene los productos desde JSON local o API real
 * AQUÍ SE DEMUESTRA LA INTEGRACIÓN CON BACKEND
 */
async function obtenerTodosLosProductos() {
    
    if (usarDatosSimulados) {
        // ========================================
        // VERSIÓN 1: DATOS SIMULADOS (JSON LOCAL)
        // ========================================
        console.log('📄 Cargando desde JSON local (simulado)');
        
        const response = await fetch('../recursos/datos/productos-simulados.json');
        
        if (!response.ok) {
            throw new Error('Error al cargar productos simulados');
        }
        
        const productos = await response.json();
        return productos;
        
    } else {
        // ========================================
        // VERSIÓN 2: API REAL (BACKEND)
        // ========================================
        console.log('🌐 Cargando desde API real (backend)');
        
        // Usar la función de api.js
        const respuesta = await obtenerProductos();
        
        return respuesta.productos || [];
    }
}




// ========================================
// CARGAR SIGUIENTES PRODUCTOS
// ========================================

/**
 * Carga el siguiente lote de productos
 * FUNCIÓN CLAVE DEL EJERCICIO
 */
function cargarSiguientesProductos() {
    console.log(`📦 Cargando productos ${productosActuales} a ${productosActuales + CONFIG.PRODUCTOS_POR_PAGINA}`);
    
    // Filtrar productos por categoría si es necesario
    let productosFiltrados = todosLosProductos;
    
    if (categoriaActual !== 'todos') {
        productosFiltrados = todosLosProductos.filter(
            p => p.categoria === categoriaActual
        );
    }
    
    // Obtener el siguiente lote
    const inicio = productosActuales;
    const fin = productosActuales + CONFIG.PRODUCTOS_POR_PAGINA;
    const siguientesProductos = productosFiltrados.slice(inicio, fin);
    
    // Renderizar productos
    renderizarProductos(siguientesProductos);
    
    // Actualizar contador
    productosActuales += siguientesProductos.length;
    productosActualesSpan.textContent = productosActuales;
    
    // Verificar si hay más productos
    verificarSiHayMasProductos(productosFiltrados.length);
}



// ========================================
// RENDERIZAR PRODUCTOS EN EL DOM
// ========================================

/**
 * Crea las cards de productos y las agrega al grid
 * Con animación fade-in
 */
function renderizarProductos(productos) {
    
    productos.forEach((producto, index) => {
        // Crear la card
        const card = crearCardProducto(producto);
    
        // Agregar al grid inmediatamente
        productosGrid.appendChild(card);
    
        // Agregar animación después de un pequeño delay
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50); // Delay de 50ms entre cada producto
    
    })
};




// ========================================
// CREAR CARD DE PRODUCTO
// ========================================

/**
 * Crea el HTML de una card de producto
 */
function crearCardProducto(producto) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('aria-label', `${producto.nombre} - ${producto.precio} euros`);
    
    // Determinar estado de stock
    const stockClass = producto.stock > 0 ? 'disponible' : 'agotado';
    const stockTexto = producto.stock > 0 
        ? `✓ ${producto.stock} disponibles` 
        : '✗ Agotado';
    const stockAriaLabel = producto.stock > 0
        ? `${producto.stock} unidades disponibles`
        : 'Producto agotado';
    
    card.innerHTML = `
        <div class="card-imagen">
            <img src="${producto.url_imagen}" 
                 alt="Imagen de ${producto.nombre}"
                 onerror="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.color='white'; this.style.fontSize='1.2rem'; this.style.fontWeight='bold'; this.style.padding='2rem'; this.innerHTML='${producto.marca}';"
                 loading="lazy">
            <span class="card-badge" aria-label="Categoría: ${producto.categoria}">${producto.categoria}</span>
        </div>
        
        <div class="card-contenido">
            <div class="card-marca" aria-label="Marca: ${producto.marca}">${producto.marca}</div>
            <h3 class="card-titulo">${producto.nombre}</h3>
            <p class="card-descripcion">${producto.descripcion}</p>
            
            <div class="card-footer">
                <div>
                    <div class="card-precio" aria-label="Precio: ${producto.precio} euros">
                        <span class="card-precio-simbolo" aria-hidden="true">€</span>${producto.precio.toFixed(2)}
                    </div>
                    <div class="card-stock ${stockClass}" aria-label="${stockAriaLabel}">
                        ${stockTexto}
                    </div>
                </div>
                
                <button class="btn btn-primario btn-sm" 
                        onclick="agregarAlCarrito(${producto.id})"
                        aria-label="Añadir ${producto.nombre} al carrito"
                        ${producto.stock === 0 ? 'disabled aria-disabled="true"' : ''}>
                    <span aria-hidden="true">🛒</span> Añadir
                </button>
            </div>
        </div>
    `;
    
    return card;
}



// ========================================
// VERIFICAR SI HAY MÁS PRODUCTOS
// ========================================

/**
 * Muestra u oculta el botón "Cargar más"
 * BUENA PRÁCTICA DE USABILIDAD #1: Feedback claro al usuario
 */
function verificarSiHayMasProductos(totalFiltrados) {
    
    if (productosActuales >= totalFiltrados) {
        // Ya no hay más productos
        btnCargarMas.classList.add('oculto');
        noMasProductos.classList.remove('oculto');
        console.log('✅ Todos los productos cargados');
    } else {
        // Aún hay más productos
        btnCargarMas.classList.remove('oculto');
        noMasProductos.classList.add('oculto');
    }
}



// ========================================
// EVENT LISTENER: BOTÓN "CARGAR MÁS"
// ========================================

/**
 * Maneja el click en el botón "Cargar más"
 * FUNCIONALIDAD CLAVE DEL EJERCICIO
 */
async function handleCargarMas() {
    console.log('🔄 Usuario clickeó "Cargar más"');
    
    // BUENA PRÁCTICA DE USABILIDAD #2: Deshabilitar botón durante la carga
    btnCargarMas.disabled = true;
    btnCargarMas.innerHTML = '<span class="spinner"></span> <span>Cargando...</span>';
    
    // Simular pequeño delay para demostrar el loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Cargar siguientes productos
    cargarSiguientesProductos();
    
    // Restaurar botón
    btnCargarMas.disabled = false;
    btnCargarMas.innerHTML = '<span>📦</span> <span>Cargar Más Productos</span>';
}




// ========================================
// FILTROS POR CATEGORÍA
// ========================================

/**
 * Filtra productos por categoría
 */
function filtrarPorCategoria(categoria) {
    console.log(`🔍 Filtrando por categoría: ${categoria}`);
    
    // Actualizar categoría actual
    categoriaActual = categoria;
    
    // Limpiar grid
    productosGrid.innerHTML = '';
    productosActuales = 0;
    
    // Actualizar botones activos
    filtrosBotones.forEach(btn => {
        if (btn.dataset.categoria === categoria) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Cargar productos filtrados
    cargarSiguientesProductos();
}




// ========================================
// CONFIGURAR EVENT LISTENERS
// ========================================

/**
 * Configura todos los event listeners
 */
function configurarEventListeners() {
    
    // Botón "Cargar más"
    btnCargarMas.addEventListener('click', handleCargarMas);
    
    // Botones de filtro
    filtrosBotones.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            filtrarPorCategoria(categoria);
        });
    });
    
    console.log('✅ Event listeners configurados');
}




// ========================================
// FUNCIONES DE UI (Loading, Errores)
// ========================================

/**
 * Muestra u oculta el indicador de carga
 */
function mostrarLoading(mostrar) {
    if (mostrar) {
        loadingProductos.classList.remove('oculto');
    } else {
        loadingProductos.classList.add('oculto');
    }
}

/**
 * Muestra un mensaje de error
 */
function mostrarError(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-error';
    alerta.textContent = mensaje;
    
    productosGrid.insertAdjacentElement('beforebegin', alerta);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => alerta.remove(), 5000);
}




// ========================================
// FUNCIÓN TEMPORAL: AGREGAR AL CARRITO
// ========================================

/**
 * Placeholder para agregar al carrito
 * (Implementaremos esta función más adelante)
 */
function agregarAlCarrito(productoId) {
    console.log(`🛒 Agregando producto ${productoId} al carrito`);
    alert(`Producto ${productoId} agregado al carrito (funcionalidad por implementar)`);
}




// ========================================
// CAMBIAR ENTRE DATOS SIMULADOS Y API REAL
// ========================================

/**
 * Función para cambiar entre JSON local y API real
 * Útil para demostración
 */
function cambiarModoDeOrigen() {
    usarDatosSimulados = !usarDatosSimulados;
    console.log(`🔄 Modo cambiado a: ${usarDatosSimulados ? 'JSON Local' : 'API Real'}`);
    
    // Recargar productos
    productosGrid.innerHTML = '';
    productosActuales = 0;
    inicializar();
}

// Exponer función globalmente para testing
window.cambiarModoDeOrigen = cambiarModoDeOrigen;




// ========================================
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ========================================

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    // El DOM ya está listo
    inicializar();
}





// ========================================
// FUNCIÓN: MOSTRAR ALERTA DE NO DISPONIBLE
// ========================================

// ========================================
// FUNCIÓN: MOSTRAR ALERTA DE NO DISPONIBLE
// ========================================

// Variable global para almacenar la alerta actual
let alertaActual = null;

/**
 * Muestra un mensaje cuando se intenta acceder a funciones no implementadas
 * Solo permite una alerta visible a la vez
 */
function mostrarFuncionNoDisponible(nombreFuncion) {
    // Si ya hay una alerta visible, removerla primero
    if (alertaActual) {
        alertaActual.remove();
        alertaActual = null;
    }
    
    // Crear nueva alerta
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-info';
    
    // Estilos base (se complementan con el CSS)
    alerta.style.position = 'fixed';
    alerta.style.top = '100px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '9999';
    alerta.style.minWidth = '320px';
    alerta.style.maxWidth = '400px';
    alerta.style.boxShadow = 'var(--sombra-xl)';
    
    alerta.innerHTML = `
        <div style="display: flex; align-items: start; gap: 12px;">
            <span style="font-size: 24px; flex-shrink: 0;">ℹ️</span>
            <div style="flex: 1; min-width: 0;">
                <strong style="display: block; margin-bottom: 8px; font-size: 15px;">Función no disponible</strong>
                <p style="margin: 0; font-size: 14px; line-height: 1.5;">
                    "${nombreFuncion}" no está disponible en este prototipo.<br>
                    <small style="opacity: 0.8; font-size: 12px;">Demostración de carga dinámica con AJAX.</small>
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(alerta);
    
    // Guardar referencia a la alerta actual
    alertaActual = alerta;
    
    // Auto-remover después de 2.5 segundos (reducido de 4)
    setTimeout(() => {
        if (alerta && alerta.parentNode) {
            alerta.style.transition = 'all 0.3s ease-out';
            alerta.style.opacity = '0';
            alerta.style.transform = 'translateX(400px)';
            
            setTimeout(() => {
                if (alerta && alerta.parentNode) {
                    alerta.remove();
                }
                // Limpiar referencia si esta es la alerta actual
                if (alertaActual === alerta) {
                    alertaActual = null;
                }
            }, 300);
        }
    }, 2500); // Reducido de 4000ms a 2500ms
}

// Exponer función globalmente
window.mostrarFuncionNoDisponible = mostrarFuncionNoDisponible;



// ========================================
// LOGS INFORMATIVOS PARA DEMOSTRACIÓN
// ========================================

//la tabla de abajo la he hecho con template literal, usando las comillas invertidas `
//Sirve solo como dato informativo en el F12, para la demostración

console.log(`
╔════════════════════════════════════════╗
║   SISTEMA DE PRODUCTOS - MMCtech      ║
╠════════════════════════════════════════╣
║ ✓ Carga dinámica con AJAX             ║
║ ✓ Paginación (${CONFIG.PRODUCTOS_POR_PAGINA} productos por vez)      ║
║ ✓ Filtros por categoría               ║
║ ✓ Feedback visual (loading)           ║
║ ✓ Animaciones suaves                  ║
╠════════════════════════════════════════╣
║ Modo actual: ${usarDatosSimulados ? 'JSON Local (simulado)' : 'API Real (backend)'}  ║
║                                        ║
║ Para cambiar el modo, ejecuta en la   ║
║ consola: cambiarModoDeOrigen()        ║
╚════════════════════════════════════════╝
`);



/* Respuesta a las 2 preguntas formuladas (también mencionado en el archivo memoria.md

ANÁLISIS DE INTEGRACIÓN: explica brevemente cómo cambiaría este prototipo para integrarse en una aplicación real con base de datos (Backend):

Actualmente este proyecto utiliza datos simulados de un archivo JSON local:
- Archivo: ../recursos/datos/productos-simulados.json
- Son 20 productos en total
- Por lo tanto, no hay persistencia de datos ni hay operaciones CRUD de BBDD.


Para conectar este prototipo con una base de datos real, necesitaríamos:

- Base de Datos:
    - Crear la base de datos relacional
    - Diseñar esquema de tablas (productos, categorías, marcas" y añadirle a cada uno su id, nombre, descripción, precio, stock, marca, ...). Además, tendríamos que establecer relaciones con "foreign keys"

- API REST (Node.js + Express):
    - Endpoint: GET /api/productos?limite=6&offset=0&categoria=Ratones
    - Endpoint: GET /api/productos/:id
    - Endpoint: POST /api/productos (admin)
    - Endpoint: PUT /api/productos/:id (admin)  
    - Endpoint: DELETE /api/productos/:id (admin)

- Servidor Back-end

- Front-end (este archivo de productos.js)
    - Habría que realizar un cambio en la URL del Fecth:
const response = await fetch(`${CONFIG.API_URL}/productos?limite=${CONFIG.PRODUCTOS_POR_PAGINA}&offset=${productosActuales}&categoria=${categoriaActual}`);

- Actualizar config.js:
    const CONFIG = {
        API_URL: 'https://api.mmctech.com/api',  // URL del backend
        PRODUCTOS_POR_PAGINA: 6,
        TIMEOUT: 5000
    };

- Mejorar el manejo de errores

- Seguridad:
    - Implementar autenticación (JWT tokens)
    - Validación de datos en backend
    - Protección contra SQL Injection (usar prepared statements)
    - CORS configurado correctamente
    - HTTPS en producción

- Optimizaciones: 
    - Caché de productos en localStorage 
    - Lazy loading de imágenes
    - Compresión de imágenes (WebP)
    - CDN para recursos estáticos
    - Índices en base de datos para búsquedas rápidas

En resumen, este prototipo es fácilmente escalable a producción con cambios mínimos.


---------------------------------------------------------------------------------------------------------- 


ANÁLISIS DE USABILIDAD: señala dos buenas prácticas de usabilidad que has aplicado o que aplicarías (ej. feedback al usuario) en este prototipo.


En este proyecto se han implementado múltiples buenas prácticas de usabilidad para mejorar la experiencia del usuario.
Destaco 2 como solicitado:

1. FEEDBACK VISUAL CONSTANTE AL USUARIO
Puesto que el usuario siempre debe saber qué está apsando en la aplicación, he implementado en este proyecto:

- Spinner de carga durante:
    - Carga inicial de productos
    - Cuando se hace click en "Cargar más"

- Contador en tiempo real:
    - "Mostrando 12 de 20 productos"
    - Se actualiza dinámicamente con cada carga

- Animaciones suaves:
    - Los productos aparecen con fade-in y no bruscamente
    - Delay escalonado: cada poducto aparece 50ms después del anterior

- Mensaje de finalización:
    - Cuando no hay más productos aparece: "Has visto todos los productos disponibles"
    - El botón "Cargar más" se oculta (y no queda como botón inútil)

- Estado deshabilitado del botón:
    - El botón "Cargar más" se deshabilita durante la carga
    - Previene clicks múltiples accidentales
    - De esta manera evita peticiones duplicadas

- Alertas informativas:
    - Para funciones que no están implementadas, como "Carrito" o "Mi cuenta"
    - Aparecen temporalmente (2.5s) y desaparecen con animación
    - Evita que se solapen, mostrando solo una alerta visible a la vez

Todo esto reduce la ansiedad del usuario y mejora la percepción de velocidad, evitando confusinoes y errores.
Además muestra una experiencia profesional y pulida.



2. PREVENCIÓN DE ERRORES Y ESTADOS CLAROS

Puesto que es mejor prevenir errores que tener que corregirlos, he implementado en este proyecto:

- Botones deshabilitados durante acciones:
    - Los ya mencionados anteriormente como en "Cargar más", que se deshabilita mientras carga y previene de otros clicks accidentales o duplicidades al servidor.

- Productos agotados no añadibles:
    - El botón "Añadir al carrito" se deshabilita si el stock = 0
    - Visual claro: el botón se ve deshabilitado, en gris

- Filtros con estado visual:
    - El filtro activo tiene clase 'active' (destacado visualmente)
    - aria-pressed="true" para lectores de pantalla
    - Solo un filtro puede estar activo a la vez

- Indicados de Stock claros:
    - "✓ 25 disponibles" en verde
    - "✗ Agotado" en rojo
    - Decisión visual inmediata

- Validación de datos:
    - Verificación de respuesta OK del fetch
    - Manejo de errores con try-catch
    - Mensajes de error amigables (no técnicos)

- Límites claros:
    - El sistema sabe cuando no hay más productos
    - Oculta el botón "Cargar más" cuando no es necesario
    - Muestra mensaje de finalización
   

Todo esto evita frustraciones al usuario y reduce errores/comportamientos inesperados.
La interfaz es más intuitiva y predecible, lo que además ayude a que requiera menos soporte técnico necesario
   
Aunque solo se solicita 2 buenas practicas, menciono otras a grosso modo y sin entrar en detalle:
    - Diseño responsive: grid adaptable, imágenes con lazy loading, botones con área táctil mínima de 44x44px
    - Accesibilidad (ARIA): roles semánticos, aria-label en todos los elementos interactivos, aria-live para anunciar cambios dinámicos y navegación por teclado funcional
    - Performance: carga progresiva con solo 6 productos iniciales, fallback de imágenes con gradientes CSS.
    - Consistencia visual: variables CSS para colores, espaciados, tipografías... misma estructura de cards en todos los productos y animacinoes uniformes

En resumen, este proyecto no solo muestra conocimientos técnicos de AJAX, JavaScript, sino también comprensión profunda de UX/UI y las necesidades del usuario final.
La combinación de feedback constante y prevención de errores crea una experiencia fluida, profesional y agradable.


Gracias, Alejandro, por compartir tus conocimientos en tus clases de tan buena manera.
   
*/