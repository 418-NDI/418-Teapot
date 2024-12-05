document.querySelectorAll('.highlightable').forEach(element => {
    element.addEventListener('mouseenter', () => {
      console.log(`Hovered over: ${element.textContent}`);
    });
  
    element.addEventListener('mouseleave', () => {
      console.log(`Mouse left: ${element.textContent}`);
    });
  });