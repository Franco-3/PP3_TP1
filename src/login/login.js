function login(){
    var password;
    var email;

    //user = document.getElementById("name").value;
    password = document.getElementById("password").value;
    email = document.getElementById("email").value;

    if (password=="lopez22andrea" && email=="lopez.laporta@gmail.com"){
        alert("iniciaste sesion!");
    }else 
     alert("usuario y/o contraseña incorrecta");

}

const form = document.querySelector('.formulario');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  });



var listado = [{nombre: "", email:"", password:""}, {email:"", password:""}, {email:"", password:""}];