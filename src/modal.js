function checkClose(evt, modalWindow = undefined) {
  if(evt.key === 'Escape') {
    modalWindow = document.querySelector(".popup_is-opened")
    closeModal(modalWindow);
  }
  else if (evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")) {
        closeModal(modalWindow);
  }
}

export function closeModal(modalWindow) {
  removeClassesClose(modalWindow);
  removeListeners();
}

export function addClassesOpen(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
}

export function addListenersOpen(modalWindow) {
  document.addEventListener('keyup', checkClose);
  modalWindow.addEventListener('click', (evt)=> checkClose(evt, modalWindow));
}

export function removeListeners() {
  document.removeEventListener('keyup', checkClose);
}

function removeClassesClose(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}
