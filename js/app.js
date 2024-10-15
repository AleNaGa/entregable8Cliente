

let carrito = []

const botonAdd = document.querySelectorAll('.agregar-carrito');
const padreCarro = document.getElementById('lista-carrito');
const Carro = padreCarro.querySelector('tbody');
const vaciarCarro = document.getElementById('vaciar-carrito');
const tarjetas = document.getElementsByClassName('card')

let borrarCurso;


const agregarCarrito = (padreCurso) => {  
    console.log(padreCurso)  
    const infoCurso = {
        imagen: padreCurso.querySelector('img').src,
        titulo: padreCurso.querySelector('h4').textContent,
        precio: padreCurso.querySelector('.precio span').textContent,
        id: padreCurso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    if(carrito.some(curso => curso.id === infoCurso.id)){
        const cursos = carrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        carrito = [...cursos]; //no se añade
    }else{
        carrito = [...carrito, infoCurso]; // se añade uno nuevo
    }
   renderCarrito();
}

const renderCarrito = () => {
    Carro.innerHTML = '';
    carrito.forEach((curso) => { //formato en el que se añade
        Carro.innerHTML += `
        <tr>
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" id="borrar-curso" data-id="${curso.id}" class="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center borrar-curso">X</a></td>
        </tr> `
    })
    //ahora que existe se crea el boton;
}

// BOTONES

botonAdd.forEach((botonAdd) => { // añadir curso
    botonAdd.addEventListener('click', () => {
        const cursoId = botonAdd.getAttribute('data-id');
        const curso = document.querySelector(`[data-id="${cursoId}"]`);
        const padreCurso = curso.parentElement.parentElement;
        agregarCarrito(padreCurso);
       
    })
})


Carro.addEventListener('click', (e) => { // borrar curso
    carrito = carrito.filter(curso => curso.id !== e.target.getAttribute('data-id'));
    renderCarrito();
})


vaciarCarro.addEventListener('click', () => { // Vaciar Carrito
    carrito = [];
    renderCarrito();
})