


/**
 * ========================================
 * CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
 * ========================================
 */



const CONFIG = {
    // URL base de la API
    // En desarrollo: localhost
    // En producción: cambiar a la URL del servidor
    API_URL: 'http://localhost:3000/api',
    
    // Configuración de paginación
    PRODUCTOS_POR_PAGINA: 6,
    
    // Tiempo de espera para peticiones (ms)
    TIMEOUT: 10000,
    
    // Mensajes
    MENSAJES: {
        ERROR_CONEXION: 'Error de conexión. Verifica tu internet.',
        ERROR_SERVIDOR: 'Error en el servidor. Intenta más tarde.',
        CARGANDO: 'Cargando...',
        SIN_RESULTADOS: 'No se encontraron resultados.',
        NO_MAS_PRODUCTOS: 'No hay más productos para mostrar.'
    },
    
    // LocalStorage keys
    STORAGE_KEYS: {
        TOKEN: 'mmctech_token',
        USUARIO: 'mmctech_usuario',
        CARRITO: 'mmctech_carrito'
    }
};

// Freeze para evitar modificaciones accidentales
Object.freeze(CONFIG);
Object.freeze(CONFIG.MENSAJES);
Object.freeze(CONFIG.STORAGE_KEYS);