const speed = 1.5;
const emojis = [
    "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", 
    "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", 
    "🇾", "🇿"
  ]; // Liste d'emojis
const images = [
    "img/cat.gif",  // Chemin vers votre image locale
    "img/shrek.webp",
]; // Liste d'images (vous pouvez les remplacer par vos propres liens ou fichiers locaux)
const instances = []; // Liste pour stocker toutes les instances

// Fonction pour obtenir une direction aléatoire
function getRandomDirection() {
  return Math.random() * 2 + 1; // Valeur entre 1 et 3
}

// Fonction pour obtenir un emoji ou une image aléatoire
function getRandomItem() {
  const isEmoji = Math.random() < 0.9; // 50% de chance de choisir un emoji ou une image
  if (isEmoji) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return { type: 'emoji', content: emojis[randomIndex] };
  } else {
    const randomIndex = Math.floor(Math.random() * images.length);
    return { type: 'image', content: images[randomIndex] };
  }
}

function isImage(content) {
    // Vérifier si c'est une URL valide
    return content.startsWith("img/");
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
    emojiSpan.bakgroundPositionc = "center"; // Centrer l'image
    itemElement.appendChild(emojiSpan);
  } else if (item.type === "image") {
    const imgElement = document.createElement("img");
    imgElement.src = item.content;
    imgElement.backgroundSize = "contain"; // Adapter la taille de l'image à l'élément
    imgElement.bakgroundPosition = "center";
    itemElement.appendChild(imgElement);
  }

  // Calculer une position aléatoire tout en évitant que l'élément dépasse de l'écran
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const maxX = screenWidth - 50; // La position x maximale pour éviter le débordement (50px est la taille de l'élément)
  const maxY = screenHeight - 50; // La position y maximale pour éviter le débordement

  const x = screenWidth/2; // Position x aléatoire dans la plage
  const y = screenHeight/2; // Position y aléatoire dans la plage

  // Créer un objet pour l'instance
  const instance = {
    element: itemElement,
    x: x,
    y: y,
    dirX: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
    dirY: getRandomDirection() * (Math.random() < 0.5 ? 1 : -1),
  };

  document.body.appendChild(itemElement);
  instances.push(instance);
}

// Création de plusieurs instances d'emoji ou d'image
for (let i = 0; i < 20; i++) {
  createItemInstance();
}

// Fonction d'animation
function animate() {
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  instances.forEach((instance) => {
    const element = instance.element;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Gestion des collisions
    if (instance.y + elementHeight >= screenHeight || instance.y <= 0) {
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
window.requestAnimationFrame(animate);
