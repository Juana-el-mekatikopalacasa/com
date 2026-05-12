// 1. Catálogo de Alimentos
const misProductos = [
    {
        nombre: "Maní Natural 1 Lb",
        precio: "$12.000",
        imagen: "images/mani.png",
        descripcion: "Maní 100% natural, sin sal ni azúcar añadida. Fuente de proteínas y grasas saludables."
    },
    {
        nombre: "Arándanos Deshidratados 1 Lb",
        precio: "$8.500",
        imagen: "images/arandanos-secos.jpg",
        descripcion: "Arándanos deshidratados, perfectos para agregar a yogures, cereales o comer como snack saludable."
    },
    {
        nombre: "Almendras 1 Lb",
        precio: "$5.000",
        imagen: "images/Almendras.png",
        descripcion: "Exquisitas almendras, ricas en vitamina E y antioxidantes."
    },
    {
        nombre: "Macadamia 1 Lb",
        precio: "$12.000",
        imagen: "images/macadamia.jpg",
        descripcion: "Nueces de macadamia suaves y mantecosas, fuente de grasas saludables y fibra."
    },
    {
        nombre: "Pistachos 1 Lb",
        precio: "$12.000",
        imagen: "images/PISTACHOS.jpg",
        descripcion: "Ricos en proteínas y fibra. Perfectos para mantener la energía."
    },
    {
        nombre: "Maní Salado 1 Lb",
        precio: "$12.000",
        imagen: "images/Maní-Frito-Salado.jpg",
        descripcion: "Maní con sal, ideal para compartir en reuniones o disfrutar en cualquier momento."
    },
    {
        nombre: "Maní Dulce 1 Lb",
        precio: "$12.000",
        imagen: "images/Maní-Dulce.jpg",
        descripcion: "Maní dulce y crujiente, perfecto para un antojo rápido."
    },
    {
        nombre: "Mix de Frutos Secos Premium",
        precio: "$12.000",
        imagen: "images/mix-frutos.jpg",
        descripcion: "Mezcla balanceada de almendras, nueces, arándanos y maní."
    },
    {
        nombre: "Mix de Frutos Secos Premium",
        precio: "$12.000",
        imagen: "images/mix-frutos.jpg",
        descripcion: "Mezcla balanceada de almendras, nueces, arándanos y maní."
    },
    {
        nombre: "Mix de Frutos Secos Premium",
        precio: "$12.000",
        imagen: "images/mix-frutos.jpg",
        descripcion: "Mezcla balanceada de almendras, nueces, arándanos y maní."
    },
    {
        nombre: "Mix de Frutos Secos Premium",
        precio: "$12.000",
        imagen: "images/mix-frutos.jpg",
        descripcion: "Mezcla balanceada de almendras, nueces, arándanos y maní."
    },
    {
        nombre: "Mix de Frutos Secos Premium",
        precio: "$12.000",
        imagen: "images/mix-frutos.jpg",
        descripcion: "Mezcla balanceada de almendras, nueces, arándanos y maní."
    },

];

let carrito = [];
const grid = document.getElementById('grid-productos');

// 2. Renderizado de Productos
function cargarProductos() {
    if (!grid) return;
    grid.innerHTML = "";

    misProductos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="price">${producto.precio}</p>
                <button class="buy-btn" onclick="agregarAlCarrito(${index}, this)">
                    Añadir al pedido
                </button>
                <button class="chevron-btn" style="background:none; border:none; color:var(--cafe-oscuro); margin-top:10px; cursor:pointer; font-size:0.8rem;" onclick="toggleDetails(this)">
                    <i data-lucide="info" style="width:14px; vertical-align:middle;"></i> Ver beneficios
                </button>
                <div class="details">
                    <p>${producto.descripcion}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

function toggleDetails(btn) {
    const details = btn.nextElementSibling;
    const allDetails = document.querySelectorAll('.details');

    // Cierra otras descripciones para no ocupar espacio excesivo en móvil
    allDetails.forEach(d => {
        if (d !== details) d.classList.remove('active');
    });

    details.classList.toggle('active');
}

// 3. Lógica del Pedido
function agregarAlCarrito(index, btn) {
    carrito.push(misProductos[index]);

    // Feedback visual en el botón
    const originalText = btn.innerText;
    btn.innerText = "¡Añadido! ✅";
    btn.style.backgroundColor = "var(--verde-organico)";

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
    }, 1000);

    actualizarInterfaz();
}

function actualizarInterfaz() {
    const cont1 = document.getElementById('cart-count-header');
    const cont2 = document.getElementById('cart-count');
    const totalE = document.getElementById('total-precio');

    if (cont1) {
        cont1.innerText = carrito.length;
        cont1.classList.add('bump'); // Puedes añadir esta clase en CSS para una pequeña animación
        setTimeout(() => cont1.classList.remove('bump'), 300);
    }
    if (cont2) cont2.innerText = carrito.length;

    let suma = 0;
    carrito.forEach(p => {
        // Limpieza de precio más robusta
        const valor = parseInt(p.precio.replace(/\D/g, ""));
        suma += valor;
    });
    if (totalE) totalE.innerText = `$${suma.toLocaleString('es-CO')}`;
}

// 4. WhatsApp Final
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("¡Tu bolsa de mekatico está vacía!");
        return;
    }

    const telefono = "573133466414";
    let mensaje = "🥜 *Pedido Juana el Mekatico* 🥜\n\nHola, quisiera los siguientes productos:\n\n";

    // Agrupar productos repetidos para que el mensaje sea más corto
    const resumen = {};
    carrito.forEach(p => {
        resumen[p.nombre] = (resumen[p.nombre] || 0) + 1;
    });

    let total = 0;
    for (const [nombre, cantidad] of Object.entries(resumen)) {
        const prod = misProductos.find(p => p.nombre === nombre);
        const precioUnitario = parseInt(prod.precio.replace(/\D/g, ""));
        mensaje += `✅ *${cantidad}x* ${nombre}\n`;
        total += (precioUnitario * cantidad);
    }

    mensaje += `\n*Total a pagar:* $${total.toLocaleString('es-CO')}\n\n_¡Espero mi mekatico pa' la casa!_`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Inicialización
document.addEventListener('DOMContentLoaded', cargarProductos);