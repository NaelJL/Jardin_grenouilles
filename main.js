// AFFICHER OU CACHER LES ELEMENTS DE LA BARRE NAV

// stocker dans elements tous les éléments qui se modifieront
let elements = document.querySelectorAll('.field, .findUs, .contact');

// éléments en display = none au (re)chargement de la page
document.addEventListener("DOMContentLoaded", function(){
    elements.forEach(el => el.style.display = "none");
});

// éléments visibles à l'appel de la fonction (donc au clic)
function show(element) {
    let current = document.querySelector(`.${element}`);
    elements.forEach(el => {
        if(el === current) {
            el.style.display = el.style.display === "none" ? "block" : "none";
        } else {
            el.style.display = "none";
        }
    });
}



// GERER L'AJOUT DE LEGUMES SUR LA PAGE ITEMS

// Ajouter facilement des légumes que l'utilisateurice pourra mettre dans le panier
let vegetables = {
    'item1': {
        'name': 'Poireaux',
        'price': 2
    }, 
    'item2': {
        'name': 'Salade d\'hiver',
        'price': 1.5
    }, 
    'item3': {
        'name': 'Pommes de terre',
        'price': 3
    }, 
    'item4': {
        'name': 'Patates douce',
        'price': 4
    }, 
    'item5': {
        'name': 'Courges',
        'price': 3
    }, 
    'item6': {
        'name': 'Oignons',
        'price': 3.5
    }, 
    'item7': {
        'name': 'Ail',
        'price': 4
    },
    'item8': {
        'name': 'Chou vert',
        'price': 3.5
    }
};

// boucle for pour parcourir le tableau et créer un container avec le nom, prix et ajout au panier pour chaque item
for (let key in vegetables) {

    let itemsStyle = document.querySelector('.items-style');

    let container = document.createElement('div');
    container.className = "vegetable-container";

    let name = document.createElement('h3');
    name.className = "vegetable-name";
    name.innerHTML = vegetables[key]['name'];

    let price = document.createElement('div');
    price.className = "vegetable-price";
    price.innerHTML = `${vegetables[key]['price']} €`;

    let logo = document.createElement('img');
    logo.className = "add-basket-logo";
    logo.src = "images/shopping-basket.png";

    container.appendChild(name);
    container.appendChild(price);
    container.appendChild(logo);

    itemsStyle.appendChild(container);
}



// AJOUTER LES LEGUMES AU PANIER

let addbasketButton = document.getElementsByClassName("add-basket-logo");

let basketName = [];
let basketPrice = [];

// boucle for pour chaque bouton addBasket
for (let i = 0; i < addbasketButton.length; i++) {
    
    // au clic sur un logo, les fonctions se déclenchent
    addbasketButton[i].addEventListener("click", function() {

        // changer la couleur de fond
        this.parentElement.classList.add('item-added');

        // changer l'image du logo
        let addBasketLogo = document.querySelectorAll('.add-basket-logo');
        for (let i = 0; i < addBasketLogo.length; i++) {
            this.src = "images/shopping-basket-ok.png";
        }
    
        // faire apparaître le panier
        let basketBlock = document.querySelector('.basket');
        basketBlock.style.display = "block";

        // les noms et les prix sont stockés dans deux tableaux différents
        let itemName = this.parentElement.getElementsByClassName("vegetable-name")[0].innerHTML;
        basketName.push(itemName);
        let itemPrice = this.parentElement.getElementsByClassName("vegetable-price")[0].innerHTML;
        basketPrice.push(itemPrice);

        // convertir en nombre les strings des prix
        let basketNumbers = [];
        basketPrice.forEach(function(item) {
            let itemNumber = parseFloat(item.split(" €")[0]);
            basketNumbers.push(itemNumber);
        });

        // Lister les items dans le panier
        let basketList = document.querySelector('.basket-list');
        basketList.innerHTML = "";

        // boucle forEach pour ajouter les légumes récupérés dans 'items' à ajouter dans 'basket'
        basketName.forEach(function(item) {

            // en créant un point li
            let itemElement = document.createElement("li");
            itemElement.innerHTML = item;
            basketList.appendChild(itemElement);

            // ajouter le logo pour supprimer un item du panier
            let itemRemover = document.createElement("img");
            itemRemover.src = "images/remove.png";
            itemRemover.classList.add('item-remover');
            itemElement.appendChild(itemRemover);

            // fonction pour supprimer un item du panier
            itemRemover.addEventListener('click', function() {
                let itemIndex = basketName.indexOf(item);
                basketName.splice(itemIndex, 1);
                basketPrice.splice(itemIndex, 1);
                itemElement.remove();            
            })

            // mettre à jour le total du prix
            let total = document.querySelector('.total');
            totalSum = basketNumbers.reduce((acc, cur) => acc + cur, 0);
            total.innerHTML = `Total : ${totalSum} €`;
            });

    });
}