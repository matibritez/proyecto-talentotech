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