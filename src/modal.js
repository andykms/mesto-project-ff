export function openModal(evt, modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  const closeButton = modalWindow.querySelector(".popup__close");
  closeButton.addEventListener("click", (evt) => closeModal(evt, modalWindow));

}

function closeModal(evt, modalWindow) {
  modalWindow.classList.remove("popup_is-opened");

}