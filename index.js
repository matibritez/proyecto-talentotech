const productos = [
  { id: 1, nombre: "Key Lime Pie", precio: 8500, imagen: "imagenes/kime.png" },
  { id: 2, nombre: "Brownie", precio: 10000, imagen: "imagenes/Brownie.png" },
  { id: 3, nombre: "Tarta de Durazno", precio: 8500, imagen: "imagenes/TartaDura.png" },
  { id: 4, nombre: "Tarta de Coco", precio: 8500, imagen: "imagenes/TartaCoco.png" },
  { id: 5, nombre: "Tarta Frutal", precio: 8500, imagen: "imagenes/TartaFrutal.png" },
  { id: 6, nombre: "Tarta de Frutilla", precio: 8500, imagen: "imagenes/TartaFrutilla.png" },
  { id: 7, nombre: "Rosca", precio: 10000, imagen: "imagenes/Rosca.png" },
  { id: 8, nombre: "Toffie", precio: 8500, imagen: "imagenes/Toffie.png" },
  { id: 9, nombre: "Pastafrola", precio: 7500, imagen: "imagenes/Pastafrola.png" },
  { id: 10, nombre: "Lemon Pie", precio: 8500, imagen: "imagenes/LemonPie.png" }
];

// DOM
const contenedor = document.getElementById("principal");
const btnCarrito = document.getElementById("btn-carrito");
const modalCarrito = document.getElementById("modal-carrito");
const listaCarritoModal = document.getElementById("lista-carrito-modal");
const totalCarritoModal = document.getElementById("total-carrito-modal");
const cerrarModalBtn = document.getElementById("cerrar-modal");
const cantidadCarrito = document.getElementById("cantidad-carrito");

// Cargar productos en la página
productos.forEach(prod => {
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <p>${prod.nombre}</p>
    <p>$${prod.precio}</p>
    <button class="boton-comprar" data-id="${prod.id}">Comprar</button>
  `;
  contenedor.appendChild(div);
});

// Carrito (localStorage)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito y actualizar contador
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCantidad();
}

// Actualizar contador visible en el ícono del carrito
function actualizarCantidad() {
  let total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  cantidadCarrito.textContent = total;
  cantidadCarrito.style.display = total > 0 ? "inline-block" : "none";
}

// Mostrar productos en ventana modal del carrito
function mostrarCarritoModal() {
  listaCarritoModal.innerHTML = "";

  if (carrito.length === 0) {
    listaCarritoModal.innerHTML = "<li>El carrito está vacío</li>";
    totalCarritoModal.textContent = "Total: $0";
    return;
  }

  carrito.forEach((prod, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}
      <div>
        <button class="sumar" data-id="${prod.id}">+</button>
        <button class="restar" data-id="${prod.id}">-</button>
        <button class="eliminar" data-index="${index}">X</button>
      </div>
    `;
    listaCarritoModal.appendChild(li);
  });

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  totalCarritoModal.textContent = `Total: $${total}`;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  let item = carrito.find(p => p.id == id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarritoModal();
}

// Eventos delegados para carrito (sumar, restar, eliminar)
document.addEventListener("click", e => {
  // Botón comprar
  if (e.target.classList.contains("boton-comprar")) {
    const id = e.target.dataset.id;
    agregarAlCarrito(id);
  }

  // Boton eliminar
  if (e.target.classList.contains("eliminar")) {
    const i = e.target.dataset.index;
    carrito.splice(i, 1);
    guardarCarrito();
    mostrarCarritoModal();
  }

  // Boton sumar cantidad
  if (e.target.classList.contains("sumar")) {
    const id = e.target.dataset.id;
    let item = carrito.find(p => p.id == id);
    if (item) {
      item.cantidad++;
      guardarCarrito();
      mostrarCarritoModal();
    }
  }

  // Boton restar cantidad
  if (e.target.classList.contains("restar")) {
    const id = e.target.dataset.id;
    let i = carrito.findIndex(p => p.id == id);
    if (i !== -1) {
      carrito[i].cantidad--;
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
      guardarCarrito();
      mostrarCarritoModal();
    }
  }
});

// Abrir modal al hacer click en icono carrito
btnCarrito.addEventListener("click", e => {
  e.stopPropagation();
  mostrarCarritoModal();
  modalCarrito.style.display = "block";
});

// Cerrar modal al hacer click en la "X"
cerrarModalBtn.addEventListener("click", () => {
  modalCarrito.style.display = "none";
});

// Cerrar modal si se hace click fuera del contenido
window.addEventListener("click", e => {
  if (e.target === modalCarrito) {
    modalCarrito.style.display = "none";
  }
});

// Inicializar contador y mostrar
guardarCarrito();


