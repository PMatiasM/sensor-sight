const openModal = (modalId: string) => {
  const button = document.createElement("button");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", `#${modalId}`);
  button.style.display = "none";
  document.body.appendChild(button);
  button.click();
  document.body.removeChild(button);
};

const closeModal = (modalId: string) => {
  const modal = document.querySelector(`#${modalId}`);
  const button = document.createElement("button");
  if (modal) {
    button.setAttribute("data-bs-dismiss", "modal");
    button.style.display = "none";
    modal.appendChild(button);
    button.click();
    modal.removeChild(button);
  }
};

export { openModal, closeModal };
