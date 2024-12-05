const emojis = ["😀", "🎉", "❤️", "🔥", "💎", "🍕"];
const images = [
  "https://via.placeholder.com/100x100/ff8800/ffffff?text=Image+1",
  "https://via.placeholder.com/100x100/e124ff/ffffff?text=Image+2",
  "https://via.placeholder.com/100x100/6a19ff/ffffff?text=Image+3",
  "https://via.placeholder.com/100x100/ff2188/ffffff?text=Image+4"
];

// Fonction pour obtenir un emoji ou une image aléatoire
function getRandomEmojiOrImage() {
  const randomChoice = Math.random();
  if (randomChoice < 0.5) {
    // Choisir un emoji
    return emojis[Math.floor(Math.random() * emojis.length)];
  } else {
    // Choisir une image
    return images[Math.floor(Math.random() * images.length)];
  }
}

// Instance de l'objet
let instance = {
  x: 0,
  y: 0,
  dirX: 1,
  dirY: 1,
  speed: 2,
  element: document.getElementById("element"), // Assurez-vous que cet élément existe dans votre HTML
};

function animate() {
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;
  const elementHeight = instance.element.clientHeight;
  const elementWidth = instance.element.clientWidth;

  // Vérification des collisions avec les bords (haut, bas, gauche, droite)
  if (instance.y + elementHeight >= screenHeight || instance.y <= 0) {
    instance.dirY *= -1;

    // Changer l'emoji à chaque collision
    const newContent = getRandomEmojiOrImage();
    updateElementContent(newContent);
  }

  if (instance.x + elementWidth >= screenWidth || instance.x <= 0) {
    instance.dirX *= -1;

    // Changer l'emoji à chaque collision
    const newContent = getRandomEmojiOrImage();
    updateElementContent(newContent);
  }

  // Mise à jour de la position
  instance.x += instance.dirX * instance.speed;
  instance.y += instance.dirY * instance.speed;

  instance.element.style.left = instance.x + "px";
  instance.element.style.top = instance.y + "px";

  // Demander une nouvelle animation
  window.requestAnimationFrame(animate);
}

// Fonction pour mettre à jour le contenu de l'élément (image ou emoji)
function updateElementContent(content) {
  if (typeof content === 'string' && content.startsWith('http')) {
    // Si c'est une image, changer l'image de l'instance
    instance.element.style.backgroundImage = `url(${content})`;
    instance.element.innerHTML = ''; // Retirer l'emoji si une image est définie
  } else {
    // Si c'est un emoji, changer l'emoji
    instance.element.innerHTML = content;
    instance.element.style.backgroundImage = ''; // Retirer l'image si un emoji est défini
  }
}

// Initialiser l'animation
window.requestAnimationFrame(animate);
