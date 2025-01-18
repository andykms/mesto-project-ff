export function openModal(evt,modalWindow) {
  addClassesOpen(modalWindow);
  addListenersOpen(modalWindow);
  if (evt.target.classList.contains("card__image")) {
    addImageModal(evt, modalWindow);
  }
}

function checkClose(evt) {
  if (evt.target.classList.contains("popup__close") || 
      evt.key === 'Escape' || 
      evt.target.classList.contains("popup")) {
        closeModal();
  }
}

export function closeModal() {
  document.querySelectorAll(".popup").forEach((modalWindow)=>{
    if(modalWindow.classList.contains("popup_is-opened")){
      removeClassesClose(modalWindow);
      removeListeners(modalWindow);
      clearInputs(modalWindow);
    }
  });
}

function addImageModal(evt, modalWindow) {
  const modalImage = modalWindow.querySelector(".popup__image");
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  const modalCaption = modalWindow.querySelector(".popup__caption");
  modalCaption.textContent = evt.target.alt;
}

function clearInputs(modalWindow) {
  const inputs = modalWindow.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}

function addClassesOpen(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  modalWindow.classList.add("popup_is-opened");
}

function addListenersOpen(modalWindow) {
  document.addEventListener('keyup', checkClose);
  modalWindow.addEventListener('click', checkClose);
}

function removeListeners(modalWindow) {
  modalWindow.removeEventListener('click', closeModal);
  document.removeEventListener('keyup', closeModal);
}

function removeClassesClose(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  modalWindow.classList.remove("popup-is-animated");
}

