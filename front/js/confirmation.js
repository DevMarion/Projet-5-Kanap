// Récupération du numéro de commande dans l'URL

let numeroCommande = new URL(window.location.href).searchParams.get("orderId");

// Insertion du numéro de commande dans la page

let order = document.getElementById("orderId").textContent = numeroCommande;

// Supression du localStorage

localStorage.clear();