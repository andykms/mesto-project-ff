export function openModal(evt,modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener('keyup', checkClose);
  modalWindow.addEventListener('click', checkClose);
  
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
  document.querySelectorAll(".popup").forEach((item)=>{
    if(item.classList.contains("popup_is-opened")){
      item.classList.remove("popup_is-opened");
      removeListeners(item);
      clearInputs(item);
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

function removeListeners(item) {
  item.removeEventListener('click', closeModal);
  document.removeEventListener('keyup', closeModal);
}

function clearInputs(item) {
  const inputs = item.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}