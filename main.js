function login(){
    user,password,email

    user = document.getElementById("name").value;
    password = document.getElementById("password").value;
    email = document.getElementById("email").value;

    if (user == "pepito" && password=="lopez22andrea" && email=="lopez.laporta@gmail.com"){
        alert("iniciaste sesion!")
    }else 
     alert("usuario incorrecto")

}
