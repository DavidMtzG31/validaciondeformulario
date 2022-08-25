// VARIABLES

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Variables para los campos:
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners(); // Dispara todos los eventListeners
function eventListeners() {
    // Arranca cuando todo el HTML está cargado:
    document.addEventListener('DOMContentLoaded', iniciarApp);   

    // Campos del formulario
    email.addEventListener('blur', validarFormulario); //   Blur = cuando entramos y salimos del campo
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    // Limpiar formulario
    btnReset.addEventListener('click', resetearFormulario);
}



// FUNCIONES

function iniciarApp() {
    btnEnviar.disabled = true;  // Deshabilita el botón
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')   // Son clases de tailwind, desactiva el botón y lo opaca
}

// Valida el formulario:
function validarFormulario(e) {

    if(e.target.value.length > 0) {

        // Elimina los mensajes de error
        const error = document.querySelector('.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');  // Son clases del Framework

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
 
        if( er.test( e.target.value ) ) {
            // Eliminando los errores:
            const error = document.querySelector('.error');
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');  // Son clases del Framework
            mostrarError('E-mail inválido');
        }
    }
    // console.log(e.target.value); // Registra lo que el usuario escribió en el campo cuando salimos de éste
    
    if (er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;  // Deshabilita el botón
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}


function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores= document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }   
}


// Envía el email

function enviarEmail(e){
    e.preventDefault();
    
    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () =>{
        spinner.style.display = 'none';

    // Mensaje de confirmación de envío
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

    //Inserta el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
        parrafo.remove();  // Elimina el mensaje de éxito
        resetearFormulario();  // Limpia el formulario
    }, 3000); 

    }, 3000 );
}

// Funcion que resetea el formulario
function resetearFormulario(){
    formulario.reset();
    email.classList.remove('border', 'border-red-500', 'border-green-500');
    asunto.classList.remove('border', 'border-red-500', 'border-green-500');
    mensaje.classList.remove('border', 'border-red-500', 'border-green-500');
    iniciarApp();
}