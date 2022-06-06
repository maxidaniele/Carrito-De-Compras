//variable
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "agregar a carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //reseteamos el carrito
        limpiarHTML(); //eliminamos todo el HTML
    })
}


//Funciones
function agregarCurso(e) {
    e.preventDefault(); //prevenimos la accion por default (ir hacia ese id '#')

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un cursos del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo articuloscarrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
       
        carritoHTML(); //volvemos a iterar sobre carrito y mostrar su html
    }
}

//lee el contenido del HTML al que le dimos click y extrae info
function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos cantidad del curso
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; //retorna objeto actulizado
            }else{
                return curso; //retorna objeto no duplicado 
            }
            })
        articulosCarrito = [...cursos];
    }else{
        
        //agrega elementos al arreglo de carrito del curso
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito en HTML
function carritoHTML(){

    //limpiar html
    limpiarHTML();

    //Recorre el carrito y genera html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row= document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;

        //agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}