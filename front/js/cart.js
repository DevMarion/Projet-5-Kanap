let panier = recupererPanier ();

/**
 * Demande des produits via l'API et fetch
 * @param { String } http://localhost:3000/api/products
 * @param { String } fetch
 * @return { Promise }
 */

fetch("http://localhost:3000/api/products")
 .then(function (response) {
     if (response.ok) {
         return response.json();
     }
 })

 .then(function (data) {

    creationArticle(data);
    totalQuantite ();
    totalPrix (data);
    supprimerProduit();
    modifierQuantite();
    
 })
 .catch(function (error) {
     console.error(error)
 });

commander();

// Fonction qui permet la création des différents articles sélectionnés par l'utilisateur

function creationArticle(data) {
    if (panier.length == 0) {

        let article = document.createElement("article");
            document.getElementById("cart__items").appendChild(article);
            article.textContent = "Le panier est vide";
    }
    else {
        for (let i in panier) {

            // création de la section article

            let article = document.createElement("article");
                document.getElementById("cart__items").appendChild(article);
                article.classList.add("cart__item");
                article.dataset.id = panier[i].id;
                article.dataset.color = panier[i].couleur;

            // création de la DIV contenant l'image du produit

            let divImg = document.createElement("div");
                article.appendChild(divImg);
                divImg.classList.add("cart__item__img");

             // création image

            const element = article.dataset.id;

            if (panier[i].id === element) {
                for (let i in data){
                    if (element === data[i]._id) {
                        let img = document.createElement("img");
                            divImg.appendChild(img);
                            img.setAttribute("src", data[i].imageUrl);
                            img.setAttribute("alt", data[i].altTxt);
                    }
                }   
            }

            // création de la DIV du contenu de l'article

            let divContenu = document.createElement("div");
                article.appendChild(divContenu);
                divContenu.classList.add("cart__item__content");

            // création de la DIV description du contenu de l'article

            let divDescription = document.createElement("div");
                divContenu.appendChild(divDescription);
                divDescription.classList.add("cart__item__content__description");
        
            // création du titre

            if (panier[i].id === element) {
                for (let i in data){
                    if (element === data[i]._id) {
                        let titre = document.createElement("h2");
                        divDescription.appendChild(titre);
                        titre.textContent = data[i].name;
                    }
                }   
            }

            // création du paragraphe sur la couleur    

            let pCouleur = document.createElement("p");
                divDescription.appendChild(pCouleur);
                pCouleur.textContent = panier[i].couleur;
            
            // création de la DIV des paramètres de contenu de l'article du panier

            let divParametres = document.createElement("div");
                divContenu.appendChild(divParametres);
                divParametres.classList.add("cart__item__content__settings");

            // création de la DIV quantité de l'article du panier

            let divQuantite = document.createElement("div");
                divParametres.appendChild(divQuantite);
                divQuantite.classList.add("cart__item__content__settings__quantity");

            // création du paragraphe de la quantité

            let pQuantite = document.createElement("p");
                divQuantite.appendChild(pQuantite);
                pQuantite.textContent = "Qté :";

            // création de l'input pour saisir la quantité

            let input = document.createElement("input");
                divQuantite.appendChild(input);
                input.setAttribute("type", "number");
                input.classList.add("itemQuantity");
                input.setAttribute("name", "itemQuantity");
                input.setAttribute("min", "1");
                input.setAttribute("max", "100");
                input.setAttribute("value", panier[i].quantite);

                // création du paragraphe du prix

                if (panier[i].id === element) {
                    for (let i in data){
                        if (element === data[i]._id) {

                            let pPrix = document.createElement("p");
                                    divDescription.appendChild(pPrix);
                                    pPrix.textContent = data[i].price + "€";

                            }
                        }   
                    }

            // création de la DIV supprimer l'article du panier 

            let divSupprimer = document.createElement("div");
                divParametres.appendChild(divSupprimer);
                divSupprimer.classList.add("cart__item__content__settings__delete");

            // création du paragraphe supprimer

            let pSupprimer = document.createElement("p");
            divSupprimer.appendChild(pSupprimer);
                pSupprimer.classList.add("deleteItem");
                pSupprimer.textContent = "Supprimer";
        }
    }
}

// Calcul de la quantité totale des articles

function totalQuantite () {
    let totalQ = 0;
   
    if (panier == null) {
        let totalQuantite = document.getElementById("totalQuantity");
        totalQuantite.textContent = 0;
    }
    else {
        for (let i of panier) {
            totalQ += Number(i.quantite);
        }

        let totalQuantite = document.getElementById("totalQuantity");
        totalQuantite.textContent = totalQ;
    }
}

// Calcul du prix total de la commande

function totalPrix (data) {
    let totalP = 0;

    if (panier == null) {
        let totalPrix = document.getElementById("totalPrice");
        totalPrix.textContent = 0;
    }
    else {
        for (let i in panier) {
            for (let j in data) {
                if (panier[i].id === data[j]._id){
                    totalP += panier[i].quantite * data[j].price;

                    let totalPrix = document.getElementById("totalPrice");
                        totalPrix.textContent = totalP;
                }
            }
        }
    }    
}

// Supression des articles

function supprimerProduit() {

    let boutonSupprimer = document.querySelectorAll(".deleteItem");
    
    for (let i = 0; i < boutonSupprimer.length; i++) {
        boutonSupprimer[i].addEventListener("click", function () {

            let boutonSupprimer2 = boutonSupprimer[i]; 
            let idSupression = boutonSupprimer2.closest(".cart__item").dataset.id;   
            let couleurSupression = boutonSupprimer2.closest(".cart__item").dataset.color;

            let produitSupprimer = panier.filter(p => p.id !== idSupression || p.couleur !== couleurSupression);

            localStorage.setItem("panier", JSON.stringify(produitSupprimer));
            window.location.reload();
        })
    }
}

function recupererPanier () {

    let panier = localStorage.getItem("panier");
        if (panier == null) {
            return [];
    }
        else {
            return (JSON.parse(panier));
        }    
    }

// Permet de modifier la quantité des produits dans le panier

function modifierQuantite() {

    let panier = recupererPanier ();

    let modificationQuantite = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < modificationQuantite.length; i++) {
        modificationQuantite[i].addEventListener("change", function (event) {
            let modificationQuantite2 = modificationQuantite[i];
            let idChangement = modificationQuantite2.closest(".cart__item").dataset.id;
            let couleurChangement = modificationQuantite2.closest(".cart__item").dataset.color;
            let quantiteChangement = event.target.value;

            let produitChangement = panier.find(d => d.id === idChangement && d.couleur === couleurChangement);
            
            if (produitChangement != undefined) {
                produitChangement.quantite = quantiteChangement;                
            }

            localStorage.setItem("panier", JSON.stringify(panier));
            window.location.reload();
        })
    }
}

//----------------------------formulaire-----------------------------------------

// Les regex

let nomRegExp = new RegExp("^[a-zA-Z]+[\-']?[[a-zA-Z]+[\-']?]*[a-zA-Z]+$");
let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

// Validation du format du prénom

let prenom = document.getElementById("firstName");

prenom.addEventListener("change", function () {
    validationPrenom(this);
});

function validationPrenom () {

    let validPrenom = nomRegExp.test(firstName.value);

    if (validPrenom) {
        return true;
    }
    else {
        let message = document.getElementById("firstNameErrorMsg");
        message.textContent = "Prénom non valide";
        return false;
    }
}

// Validation du format du nom

let nom = document.getElementById("lastName");

nom.addEventListener("change", function () {
    validationNom(this);
});

function validationNom () {

    let validNom = nomRegExp.test(lastName.value);

    if (validNom) {
        return true;
    }
    else {
        let message = document.getElementById("lastNameErrorMsg");
        message.textContent = "Nom non valide";
        return false;
    }
}

// Validation du format de la ville

let ville = document.getElementById("city");

ville.addEventListener("change", function () {
    validationVille(this);
});

function validationVille () {

    let validVille = nomRegExp.test(city.value);

    if (validVille) {
        return true;
    }
    else {
        let message = document.getElementById("cityErrorMsg");
        message.textContent = " Ville non valide";
        return false;
    }
}

// Validation du format de l'email

let email = document.getElementById("email");

email.addEventListener("change", function () {
    validationEmail(this);
});

function validationEmail () {

    let validEmail = emailRegExp.test(email.value);

    if (validEmail) {
        return true;
    }
    else {
        let message = document.getElementById("emailErrorMsg");
        message.textContent = "Adresse mail non valide";
        return false;
    }
}

// Fonction qui permet de finaliser la commande

function commander () {

    let commande = document.getElementById("order");

    commande.addEventListener('click', (event) => {
        event.preventDefault();

        if (panier.length === 0) {
            alert("Votre panier est vide, veuillez sélectionner un article");
        }

        if (!nomRegExp.test(firstName.value) || !nomRegExp.test(lastName.value) || !nomRegExp.test(city.value) || !emailRegExp.test(email.value) || address.value === "") {
            alert("Veuillez remplir tous les champs du formulaire");
        }

        else {
            EnvoyerDonnees ();
            
        }
        
    })
}

// Fonction qui envoie les données demandées par le backend

function EnvoyerDonnees () {

        let products = [];
            for (let i = 0; i < panier.length; i++) {
                products.push(panier[i].id);
            }

        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };

        let donneesEnvoyees = {contact, products};
    

    fetch("http://localhost:3000/api/products/order", {
        method : "POST",
        headers : {
            "Accept": "application/json",
            "Content-type": "application/json",
        },

        body: JSON.stringify(donneesEnvoyees)

    })

    .then(function (response) {
        if (response.ok) {
            return response.json();
        }})
                
    .then(function (data) {
        let orderId = data.orderId;
        window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })

    .catch(function (error) {
        console.error(error)
    });
}