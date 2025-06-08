// Función para ir al menú con número de mesa
function irAlMenu() {
    const numeroMesa = document.getElementById('numeroMesa').value;
    
    if (!numeroMesa || numeroMesa < 1 || numeroMesa > 50) {
        alert('Por favor, introduce un número de mesa válido (1-50)');
        return;
    }
    
    // Redirigir al menú con el número de mesa
    window.location.href = `menu.html?mesa=${numeroMesa}`;
}

// Función para obtener parámetros de la URL
function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para manejar Enter en el input de mesa
document.addEventListener('DOMContentLoaded', function() {
    const inputMesa = document.getElementById('numeroMesa');
    if (inputMesa) {
        inputMesa.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                irAlMenu();
            }
        });
    }
});

// Configuración global de la aplicación
const CONFIG = {
    nombreRestaurante: 'Restaurante QR',
    mesasDisponibles: 50,
    moneda: '€',
    iva: 21 // Porcentaje de IVA
};

// Utilidades generales
const Utils = {
    // Formatear precio
    formatearPrecio: function(precio) {
        return `${precio.toFixed(2)} ${CONFIG.moneda}`;
    },
    
    // Calcular IVA
    calcularIVA: function(precio) {
        return (precio * CONFIG.iva) / 100;
    },
    
    // Precio con IVA
    precioConIVA: function(precio) {
        return precio + this.calcularIVA(precio);
    },
    
    // Generar ID único
    generarID: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Obtener fecha actual formateada
    obtenerFechaActual: function() {
        return new Date().toLocaleString('es-ES');
    }
};

// Gestión de localStorage (para datos temporales)
const Storage = {
    // Guardar pedido actual
    guardarPedido: function(pedido) {
        localStorage.setItem('pedidoActual', JSON.stringify(pedido));
    },
    
    // Obtener pedido actual
    obtenerPedido: function() {
        const pedido = localStorage.getItem('pedidoActual');
        return pedido ? JSON.parse(pedido) : null;
    },
    
    // Limpiar pedido
    limpiarPedido: function() {
        localStorage.removeItem('pedidoActual');
    },
    
    // Guardar productos (para admin)
    guardarProductos: function(productos) {
        localStorage.setItem('productos', JSON.stringify(productos));
    },
    
    // Obtener productos
    obtenerProductos: function() {
        const productos = localStorage.getItem('productos');
        return productos ? JSON.parse(productos) : this.obtenerProductosIniciales();
    },
    
    // Productos iniciales de ejemplo
    obtenerProductosIniciales: function() {
        return [
            {
                id: 1,
                nombre: 'Pizza Margarita',
                descripcion: 'Base de tomate, mozzarella y albahaca fresca',
                precio: 12.50,
                categoria: 'Pizzas',
                disponible: true,
                imagen: '🍕',
                codigo_tpv: 'PIZZA_MARG_001'
            },
            {
                id: 2,
                nombre: 'Hamburguesa Clásica',
                descripcion: 'Carne de ternera, lechuga, tomate, cebolla y salsa especial',
                precio: 11.90,
                categoria: 'Hamburguesas',
                disponible: true,
                imagen: '🍔',
                codigo_tpv: 'BURG_CLAS_001'
            },
            {
                id: 3,
                nombre: 'Ensalada César',
                descripcion: 'Lechuga romana, pollo, parmesano, picatostes y salsa césar',
                precio: 9.50,
                categoria: 'Ensaladas',
                disponible: true,
                imagen: '🥗',
                codigo_tpv: 'ENS_CESAR_001'
            },
            {
                id: 4,
                nombre: 'Cerveza Estrella',
                descripcion: 'Cerveza rubia nacional 33cl',
                precio: 2.50,
                categoria: 'Bebidas',
                disponible: true,
                imagen: '🍺',
                codigo_tpv: 'BEB_CERV_001'
            },
            {
                id: 5,
                nombre: 'Agua Mineral',
                descripcion: 'Agua mineral natural 50cl',
                precio: 1.80,
                categoria: 'Bebidas',
                disponible: true,
                imagen: '💧',
                codigo_tpv: 'BEB_AGUA_001'
            }
        ];
    }
};

// Inicializar productos si no existen
if (!localStorage.getItem('productos')) {
    Storage.guardarProductos(Storage.obtenerProductosIniciales());
}