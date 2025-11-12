


/**
 * ========================================
 * FUNCIONES PARA COMUNICARSE CON LA API
 * ========================================
 */


/**
 * Función genérica para hacer peticiones HTTP
 * @param {string} endpoint - Ruta del endpoint (ej: '/productos')
 * @param {object} opciones - Opciones de fetch (method, body, headers)
 * @returns {Promise} - Respuesta en JSON
 */
async function peticionAPI(endpoint, opciones = {}) {
    try {
        // Configuración por defecto
        const configuracion = {
            method: opciones.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...opciones.headers
            }
        };
        
        // Agregar body si existe (para POST, PUT)
        if (opciones.body) {
            configuracion.body = JSON.stringify(opciones.body);
        }
        
        // Agregar token de autenticación si existe
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
        if (token) {
            configuracion.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Hacer la petición
        const url = `${CONFIG.API_URL}${endpoint}`;
        const respuesta = await fetch(url, configuracion);
        
        // Parsear respuesta
        const datos = await respuesta.json();
        
        // Si hay error HTTP, lanzar excepción
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || CONFIG.MENSAJES.ERROR_SERVIDOR);
        }
        
        return datos;
        
    } catch (error) {
        console.error('Error en petición API:', error);
        throw error;
    }
}



/**
 * ========================================
 * FUNCIONES ESPECÍFICAS PARA PRODUCTOS
 * ========================================
 */

/**
 * Obtener productos con paginación
 * @param {number} limite - Cantidad de productos a obtener
 * @param {number} offset - Desde qué producto empezar
 * @returns {Promise} - Objeto con productos y metadata
 */
async function obtenerProductos(limite = null, offset = 0) {
    let endpoint = '/productos';
    
    // Agregar parámetros de paginación si existen
    if (limite) {
        endpoint += `?limite=${limite}&offset=${offset}`;
    }
    
    return await peticionAPI(endpoint);
}

/**
 * Obtener un producto específico por ID
 * @param {number} id - ID del producto
 * @returns {Promise} - Datos del producto
 */
async function obtenerProductoPorId(id) {
    return await peticionAPI(`/productos/${id}`);
}

/**
 * Buscar productos por término
 * @param {string} termino - Término de búsqueda
 * @returns {Promise} - Productos que coinciden
 */
async function buscarProductos(termino) {
    return await peticionAPI(`/productos/buscar?q=${encodeURIComponent(termino)}`);
}

/**
 * Obtener productos por categoría
 * @param {string} categoria - Nombre de la categoría
 * @returns {Promise} - Productos de esa categoría
 */
async function obtenerProductosPorCategoria(categoria) {
    return await peticionAPI(`/productos/categoria/${categoria}`);
}



/**
 * ========================================
 * FUNCIONES DE AUTENTICACIÓN
 * ========================================
 */

/**
 * Iniciar sesión
 * @param {string} email - Email del usuario
 * @param {string} contraseña - Contraseña del usuario
 * @returns {Promise} - Token y datos del usuario
 */
async function login(email, contraseña) {
    return await peticionAPI('/auth/login', {
        method: 'POST',
        body: { email, contraseña }
    });
}

/**
 * Registrar nuevo usuario
 * @param {object} datosUsuario - Datos del usuario (email, contraseña, nombre_completo)
 * @returns {Promise} - Token y datos del usuario
 */
async function registro(datosUsuario) {
    return await peticionAPI('/auth/registro', {
        method: 'POST',
        body: datosUsuario
    });
}

/**
 * Cerrar sesión
 */
function logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USUARIO);
    window.location.href = '/';
}

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean}
 */
function estaAutenticado() {
    return !!localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
}

/**
 * Obtener datos del usuario actual
 * @returns {object|null}
 */
function obtenerUsuarioActual() {
    const usuario = localStorage.getItem(CONFIG.STORAGE_KEYS.USUARIO);
    return usuario ? JSON.parse(usuario) : null;
}