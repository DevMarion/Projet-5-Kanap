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
        creationProduit(data);

    })
    .catch(function (error) {
        console.error(error)
    });

// Fonction de création des produits dans la page d'accueil

 function creationProduit(data) {
    for (let i in data) {

        // Création lien vers la page produit

        let lien = document.createElement("a");
        document.getElementById("items").appendChild(lien);
        lien.setAttribute("href", `./product.html?id=${data[i]._id}`);

        let article = document.createElement("article");
        lien.appendChild(article);

        // Création image du produit

        let image = document.createElement("img");
        article.appendChild(image);
        image.setAttribute("src", data[i].imageUrl);
        image.setAttribute("alt", data[i].altTxt);

        // Création du titre du produit

        let titre = document.createElement("h3");
        article.appendChild(titre);
        titre.classList.add("productName");
        titre.textContent = data[i].name;

        // Création description du produit

        let description = document.createElement("p");
        article.appendChild(description);
        description.classList.add("productDescription");
        description.textContent = data[i].description;

    }
 }