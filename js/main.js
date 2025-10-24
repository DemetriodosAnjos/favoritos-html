const cards = document.querySelectorAll(".card");
let draggedItem = null;

// Inicia o arrasto
cards.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    draggedItem = card;
    e.dataTransfer.setData("text/plain", "");
  });
});

// Permite o drop em qualquer container
const containers = document.querySelectorAll(".card-container");

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();

    const targetCard = e.target.closest(".card");

    if (targetCard && targetCard !== draggedItem) {
      const bounding = targetCard.getBoundingClientRect();
      const offset = e.clientY - (bounding.top + bounding.height / 2);

      if (offset > 0) {
        targetCard.after(draggedItem);
      } else {
        targetCard.before(draggedItem);
      }
    } else {
      // Se não houver card alvo, adiciona no final do container
      container.appendChild(draggedItem);
    }

    draggedItem = null;
  });
});
