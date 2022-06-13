const idArticle = new URL(window.location.href).searchParams.get("id");

/**
 * Demande des produits via l'API et fetch
 * @param { String } http://localhost:3000/api/products
 * @param { String } fetch
 * @return { Promise }
 */

 fetch(`http://localhost:3000/api/products/${idArticle}`)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })

    .then(function (data) {
        creationArticle(data);

    })
    .catch(function (error) {
        console.error(error)
    });

    // Création de l'article de la page produit

function creationArticle(data) {
    
    let imageArticle = document.createElement("img");
        document.querySelector(".item__img").appendChild(imageArticle);
        imageArticle.setAttribute("src", data.imageUrl);
        imageArticle.setAttribute("alt", data.altTxt);

    let titreArticle = document.getElementById("title").textContent= data.name;

    let prixArticle = document.getElementById("price").textContent = data.price;

    let descriptionArticle = document.getElementById("description").textContent = data.description;

    for (let i in data.colors) {

    let couleurArticle = document.createElement("option");
        document.getElementById("colors").appendChild(couleurArticle);
        couleurArticle.setAttribute("value", data.colors[i]);
        couleurArticle.textContent = data.colors[i];
    }
}

//-----------------------LocaStorage-------------------------------

// Recupère les infos du localStorage

function recupererPanier () {

    let panier = localStorage.getItem("panier");
        if (panier == null) {
            return [];
    }
    else {
        return (JSON.parse(panier));
    }    
}

// Popup qui confirme l'ajout du produit dans le panier

function popupConfirmation () {
    if (window.confirm(`L'article  sélectionné a bien été ajouté au panier.
    Consulter le panier en appuyant sur OK ou revenir à l'accueil avec Annuler `)) {
        window.location.href = "cart.html";
    } 
    else {
        window.location.href = "index.html";
    }
}

// Au clic 

addToCart.onclick = () => {

    let panier = recupererPanier ();

    let  product = {
        id : idArticle,  
        quantite : Number(document.querySelector("#quantity").value),
        couleur : document.querySelector("#colors").value
    };

    // alerte si la couleur ou la quantité n'est pas sélectionné par l'acheteur

    if (product.quantite === 0|| product.quantite < 0 || product.quantite > 100 || product.couleur === "" ) {
        if(confirm('Veuillez renseigner une quantité supérieure à 0 et inférieure à 100 et / ou sélectionner une couleur')){
            window.location.reload();  
            return 0;
        }
    }
    
    // recherche si produit déjà dans le localStorage

    let chercherProduit = panier.find(p => p.id === product.id && p.couleur === product.couleur);
        if(chercherProduit != undefined) {
            chercherProduit.quantite += product.quantite;
        }
        else {
            panier.push(product);
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        popupConfirmation();
}



