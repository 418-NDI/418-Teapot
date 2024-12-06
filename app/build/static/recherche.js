const speed = 1;
const ratioEmojiImg = 0.2;
const inputField = document.getElementById("customInput");
const emojis = [ // Liste d'emojis
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
    "y", "z"
]; 
const supprEnter = ["❌","✅"];

const images = [ // Liste d'image
    //"img/cat.gif", 
    //"img/shrek.webp",
    "static/recherche/poulpy.png",
    "static/recherche/Hypopooo.png",
    "static/recherche/Torty.png",
    "static/recherche/fished.png"
]; 
const instances = []; // Liste des instances

// Fonction pour obtenir une direction aléatoire
function getRandomDirection() {
return Math.random() * 2 + 1; // Valeur entre 1 et 3
}

// Fonction pour obtenir un emoji ou une image aléatoire
function getRandomItem() {
const isEmoji = Math.random() < ratioEmojiImg; 
if (isEmoji) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return { type: 'emoji', content: emojis[randomIndex] };
} else {
    const randomIndex = Math.floor(Math.random() * images.length);
    return { type: 'image', content: images[randomIndex] };
}
}



// Fonction pour créer une nouvelle instance (emoji ou image)
function createItemInstance() {
        const item = getRandomItem();
        const itemElement = document.createElement("div");
        itemElement.classList.add("animated-item");

    if (item.type === "emoji") {
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = item.content;
        emojiSpan.backgroundSize = "contain"; // Adapter la taille de l'image à l'élément
        emojiSpan.backgroundPosition = "center"; // Centrer l'image
        itemElement.appendChild(emojiSpan);
    
} else if (item.type === "image") {
        const imgElement = document.createElement("img");
        imgElement.src = item.content;
        imgElement.backgroundSize = "contain"; // Adapter la taille de l'image à l'élément
        imgElement.bakgroundPosition = "center";
        itemElement.appendChild(imgElement);
}


    // Créer un objet pour l'instance
    const instance = {
        element: itemElement,
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        dirX: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
        dirY: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
    };

    document.body.appendChild(itemElement);
    instances.push(instance);
    }
    //Fonction pour créer toute les instances de lettre
function createEmojiInstance() {

    supprEnter.forEach((action) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("animated-item");

        // Créer un élément pour l'action ("Suppr" ou "Enter")
        const actionSpan = document.createElement("span");
        actionSpan.textContent = action;
        actionSpan.style.fontSize = "10vh"; // Taille des actions (vous pouvez l'ajuster)

        // Ajouter un événement spécifique pour chaque action
        if (action === "❌") {
            actionSpan.addEventListener("click", function() {
                inputField.textContent = ""; // Supprimer tout le texte dans le champ
            });
        } else if (action === "✅") {
            actionSpan.addEventListener("click", function() {
                // Vous pouvez définir ici ce que l'Enter fait, par exemple valider
                console.log("Text validated: " + inputField.textContent);
                // Ou envoyer le texte à une autre fonction ou effectuer une autre action
            });
        }

        itemElement.appendChild(actionSpan);

        // Créer un objet pour l'instance
        const instance = {
            element: itemElement,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            dirX: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
            dirY: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
        };

        document.body.appendChild(itemElement);
        instances.push(instance);
    });

    emojis.forEach(emoji => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("animated-item");

    // Créer un élément pour l'emoji
    const emojiSpan = document.createElement("span");
    emojiSpan.textContent = emoji;
    emojiSpan.style.fontSize = "10vh"; // Taille des emojis
    //emojiSpan.addEventListener("click", () => handleEmojiClick(emoji));

    emojiSpan.addEventListener("click", function() {
        inputField.textContent += emoji;  // Ajouter la lettre dans le champ
      });

    itemElement.appendChild(emojiSpan);

    

    // Créer un objet pour l'instance
    const instance = {
        element: itemElement,
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        dirX: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
        dirY: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
    };

    document.body.appendChild(itemElement);
    instances.push(instance);
    });
}


function initJs(){
    for (let i = 0; i < 10; i++) {
        createItemInstance();
    }
    createEmojiInstance();

    window.requestAnimationFrame(animate);
    
}

//main

window.addEventListener("load", () => {
    console.log("All resources are loaded.");
    initJs();
});








// Fonction d'animation
function animate() {
    const screenHeightOffset = Math.round(window.innerWidth * 0.1);
    const screenHeight = window.innerHeight - screenHeightOffset;
    const screenWidth = window.innerWidth;

instances.forEach((instance) => {
    const element = instance.element;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Gestion des collisions
    if (instance.y + elementHeight >= screenHeight + screenHeightOffset || instance.y <= screenHeightOffset) {
    instance.dirY *= -1;
    }
    if (instance.x + elementWidth >= screenWidth || instance.x <= 0) {
    instance.dirX *= -1;
    
    }
    


    // Mise à jour de la position
    instance.x += instance.dirX * speed;
    instance.y += instance.dirY * speed;
    element.style.left = instance.x + "px";
    element.style.top = instance.y + "px";


});

// Demander une nouvelle animation
window.requestAnimationFrame(animate);
}

// Démarrer l'animation

