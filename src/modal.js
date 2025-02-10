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

function checkCloseClick(evt, modalWindow) {
  if (evt.target.classList.contains("popup") ||
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
  document.addEventListener('keyup', checkCloseKeyup);
  modalWindow.addEventListener('click', (evt)=> checkCloseClick(evt, modalWindow));
}

export function removeListeners() {
  document.removeEventListener('keyup', checkCloseKeyup);
}

function removeClassesClose(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}
