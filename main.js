// AFFICHER OU CACHER LES ELEMENTS DE LA BARRE NAV

// stocker dans elements tous les éléments qui se modifieront
let elements = document.querySelectorAll('.items, .field, .findUs, .contact');

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


// GERER LES COMMANDES

// fonction pour changer la couleur de fond et le logo
function changeAppearance (element) {
    element.parentElement.classList.add('item-added');

    let addBasketLogo = document.querySelectorAll('.add-basket-logo');
    for (let i = 0; i < addBasketLogo.length; i++) {
        element.src = "images/shopping-basket-ok.png";
    }
}

// fonction pour faire apparaître le panier
function displayBasket () {
    let basketBlock = document.querySelector('.basket');
    basketBlock.style.display = "block";
}

// fonction pour ajouter les noms et les prix dans les tableaux
let basket = [];
function addToBasket (element) {
    let item = {};
    item.name = element.parentElement.getElementsByClassName("vegetable-name")[0].innerHTML;
    item.price = parseFloat(element.parentElement.getElementsByClassName("vegetable-price")[0].innerHTML.split(" €")[0]);
    
    basket.push(item);
}

// fonction pour mettre à jour le total du panier
function updateTotal (basketNumbers) {
    let total = document.querySelector('.total');
    totalSum = basketNumbers.reduce((acc, cur) => acc + cur, 0);
    total.innerHTML = `Total : ${totalSum} €`;
}

// fonction pour lister les légumes du panier
function listInBasket (basket) {
    let basketList = document.querySelector('.basket-list');
    basketList.innerHTML = "";

    basketName.forEach(function(item) {
        // créer des points li pour chaque légumes
        let itemElement = document.createElement("li");
        itemElement.innerHTML = `${item.name} : ${item.price} €`;
        basketList.appendChild(itemElement);
        // ajouter le logo pour supprimer un élément
        let itemRemover = document.createElement("img");
        itemRemover.src = "images/remove.png";
        itemRemover.classList.add('item-remover');
        itemElement.appendChild(itemRemover);
        // fonction pour supprimer un item du panier
        itemRemover.addEventListener('click', function(){
            let itemIndex = basketName.indexOf(item);
            basket.splice(itemIndex, 1);
            itemElement.remove();
            // mettre à jour le total du prix
            updateTotal (basketNumbers);
        })
    })
}

// fonction pour ajouter un légume au panier
function addVegetable (element) {
    changeAppearance(element);
    displayBasket();
    addToBasket(element);
    updateTotal(basketNumbers);
    listInBasket(basketName);
}

// boucle for pour chaque bouton addBasket : au clic sur un logo, les fonctions se déclenchent
let addBasketButton = document.getElementsByClassName("add-basket-logo");

for (let i = 0; i < addBasketButton.length; i++) {
    addBasketButton[i].addEventListener('click', addVegetable);
}