function checkClose(evt) {
  if (evt.key === 'Escape' || 
      evt.target.classList.contains("popup")) {
        closeModal(evt.target);
        return true;
  }
  else if(evt.target.classList.contains("popup__close")) {
      closeModal(evt.target.parentNode.parentNode);
      return true;
  }
  return false;
}

function checkCloseWithInputs(evt) {
  if(checkClose(evt)) {
    evt.target.removeEventListener('click', checkCloseWithInputs);
    clearInputs(evt.target);
  }
}

export function closeModal(modalWindow) {
  removeClassesClose(modalWindow);
  removeListeners(modalWindow);
}

export function clearInputs(modalWindow) {
  const inputs = modalWindow.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}

export function addClassesOpen(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  modalWindow.classList.add("popup_is-opened");
}

export function addListenersOpen(modalWindow, withInputs = false) {
  document.addEventListener('keyup', checkClose);
  if(withInputs){
    modalWindow.addEventListener('click', checkCloseWithInputs);
  }
  else {
    modalWindow.addEventListener('click', checkClose);
  }
}

function removeListeners(modalWindow) {
  modalWindow.removeEventListener('click', checkClose);
  document.removeEventListener('keyup', checkClose);
}

function removeClassesClose(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  modalWindow.classList.remove("popup-is-animated");
}
