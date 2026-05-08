document.addEventListener("DOMContentLoaded", function() {

    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");

    // Mostrar registro
    showRegister.addEventListener("click", function(e) {
        e.preventDefault();
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    });

    // Mostrar login
    showLogin.addEventListener("click", function(e) {
        e.preventDefault();
        registerContainer.style.display = "none";
        loginContainer.style.display = "block";
    });

    // ---------------- REGISTRO ----------------
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("register-username").value;
        const pass = document.getElementById("register-password").value;
        const pass2 = document.getElementById("register-password2").value;
        const age = parseInt(document.getElementById("register-age").value);

        if (isNaN(age) || age < 18) {
            alert("Debes ser mayor de 18 años para registrarte.");
            return;
        }

        if (pass !== pass2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (user.length < 3 || pass.length < 3) {
            alert("Usuario y contraseña deben tener al menos 3 caracteres");
            return;
        }

        // Guardar usuario
        localStorage.setItem("user", user);
        localStorage.setItem("pass", pass);
        localStorage.setItem("age", age);

        alert("Registro exitoso. Ahora puedes iniciar sesión.");

        registerContainer.style.display = "none";
        loginContainer.style.display = "block";
    });

    // ---------------- LOGIN ----------------
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("login-username").value;
        const pass = document.getElementById("login-password").value;
        const age = parseInt(document.getElementById("login-age").value);

        const savedUser = localStorage.getItem("user");
        const savedPass = localStorage.getItem("pass");
        const savedAge = parseInt(localStorage.getItem("age"));

        if (isNaN(age) || age < 18) {
            alert("Debes ser mayor de 18 años para ingresar.");
            return;
        }

        // 🔥 ADMIN
        if (user === "admin" && pass === "1234" && age === 99) {
            alert("Bienvenido Administrador 👑");
            window.location.href = "admin.html";
            return;
        }

        // 👤 USUARIO NORMAL
        if (user === savedUser && pass === savedPass && age === savedAge) {
            alert("Bienvenido, " + user + "!");
            window.location.href = "index.html";
        } else {
            alert("Usuario, contraseña o edad incorrectos");
        }
    });

});
let total = 0;

const lista = document.getElementById("lista");
const totalHTML = document.getElementById("total");
const botones = document.querySelectorAll(".btn-agregar");
const btnLimpiar = document.getElementById("btn-limpiar");

// agregar productos
botones.forEach(boton => {
    boton.addEventListener("click", function() {
        const nombre = this.getAttribute("data-nombre");
        const precio = parseInt(this.getAttribute("data-precio"));

        agregarProducto(nombre, precio);
    });
});

function agregarProducto(nombre, precio) {

    let li = document.createElement("li");
    li.textContent = `${nombre} - $${precio}`;

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("btn-eliminar");

    btnEliminar.addEventListener("click", function() {
        lista.removeChild(li);
        total -= precio;
        actualizarTotal();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    total += precio;
    actualizarTotal();
}

function actualizarTotal() {
    totalHTML.textContent = total;
}

// limpiar todo
btnLimpiar.addEventListener("click", function() {
    lista.innerHTML = "";
    total = 0;
    actualizarTotal();
});
