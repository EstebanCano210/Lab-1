document.getElementById("boton").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const contra = document.getElementById("contra").value;

    if (email && contra) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", contra);

        window.location.href = "/pages/contactos.html";
    } else {
        document.getElementById("error").textContent = "Por favor, completa todos los campos.";
    }
});
