


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