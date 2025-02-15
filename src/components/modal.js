export function openModal(evt,modalWindow) {
  addClassesOpen(modalWindow);
  addListenersOpen(modalWindow);
}

function checkCloseKeyup(evt) {
  if(evt.key === 'Escape') {
    const modalWindow = document.querySelector(".popup_is-opened");
    closeModal(modalWindow);
  }
}

function checkCloseClick(evt) {
  if (evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")) {
        const modalWindow = document.querySelector(".popup_is-opened");
        closeModal(modalWindow);
  }
}

export function closeModal(modalWindow) {
  removeClassesClose(modalWindow);
  removeListeners(modalWindow);
}

export function addClassesOpen(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
}

export function addListenersOpen(modalWindow) {
  document.addEventListener('keyup', checkCloseKeyup);
  modalWindow.addEventListener('mousedown', checkCloseClick);
}

export function removeListeners(modalWindow) {
  document.removeEventListener('keyup', checkCloseKeyup);
  modalWindow.removeEventListener('mousedown', checkCloseClick)
}

function removeClassesClose(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}
