function checkClose(evt, modalWindow = undefined) {
  if(evt.key === 'Escape' && !modalWindow) {
    modalWindow = document.querySelector(".popup_is-opened");
    checkForForm(modalWindow);
  }
  else if (evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")) {
        checkForForm(modalWindow);
  }
}

function checkForForm(modalWindow) {
  if(modalWindow.querySelector(".popup__form")) {
    closeModal(modalWindow, true);
  }
  else {
    closeModal(modalWindow);
  };
}

export function closeModal(modalWindow, closeForm = false) {
  removeClassesClose(modalWindow);
  removeListeners();
  if(closeForm) {
    clearInputs(modalWindow);
  }
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

function clearInputs(modalWindow) {
  const inputs = modalWindow.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}