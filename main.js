// AFFICHER OU CACHER LES ELEMENTS DE LA BARRE NAV

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

let vegetables = [
    {
        'name': 'Poireaux',
        'price': 2
    }, {
        'name': 'Salade d\'hiver',
        'price': 1.5
    }, {
        'name': 'Pommes de terre',
        'price': 3
    }, {
        'name': 'Patates douce',
        'price': 4
    }, {
        'name': 'Courges',
        'price': 3
    }, {
        'name': 'Oignons',
        'price': 3.5
    }, {
        'name': 'Ail',
        'price': 4
    }, {
        'name': 'Chou vert',
        'price': 3.5
    }
];

// fonction utilisant une boucle for pour créer des container pour chaque objet du tableau vegetables
function displayVegetables () {

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
}

displayVegetables();



// GERER LES COMMANDES

let addbasketButton = document.getElementsByClassName("add-basket-logo");

for (let i = 0; i < addbasketButton.length; i++) {
    addbasketButton[i].addEventListener("click", addVegetable);
}

let basket = [];

function addVegetable () {

        // changer l'image du logo
        let addBasketLogo = document.querySelectorAll('.add-basket-logo');
        for (let i = 0; i < addBasketLogo.length; i++) {
            this.src = "images/shopping-basket-ok.png";
        }

        // remettre l'apparence initiale au bout de 2 secondes
        let clickedImage = this;
        setTimeout(function() {
            clickedImage.src = "images/shopping-basket.png";
        }, 1000);
    
        // faire apparaître le panier
        let basketBlock = document.querySelector('.basket');
        basketBlock.style.display = "block";

        // stocker les noms et les prix de l'item sélectionné
        let item = {};
        item.name = this.parentElement.getElementsByClassName("vegetable-name")[0].innerHTML;
        item.stringPrice = this.parentElement.getElementsByClassName("vegetable-price")[0].innerHTML;
        item.numberPrice = parseFloat(item.stringPrice.split(" €")[0]);
        basket.push(item);

        // Lister les items dans le panier
        let basketList = document.querySelector('.basket-list');
        basketList.innerHTML = "";

        // boucle forEach pour ajouter les légumes récupérés dans 'items' à ajouter dans 'basket'
        basket.forEach(function(item) {

            // créer un point
            let itemElement = document.createElement("p");
            itemElement.innerHTML = item.name;
            basketList.appendChild(itemElement);

            // ajouter le logo pour supprimer un item du panier
            let itemRemover = document.createElement("img");
            itemRemover.src = "images/remove.png";
            itemRemover.classList.add('item-remover');
            itemElement.appendChild(itemRemover);

            // mettre à jour le total du prix
            let total = document.querySelector('.total');
            
            totalSum = basket.reduce((acc, current) => {
                return acc + current.numberPrice
            }, 0);            
            total.innerHTML = `Total : ${totalSum} €`;

            // fonction pour supprimer un item du panier
            itemRemover.addEventListener('click', function() {
                let itemIndex = basket.indexOf(item);
                basket.splice(itemIndex, 1);

                itemElement.remove();   

                totalSum = basket.reduce((acc, current) => {
                    return acc + current.numberPrice
                }, 0);            
                total.innerHTML = `Total : ${totalSum} €`;  
            })

        });
}
