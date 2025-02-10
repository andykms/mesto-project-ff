import { messages } from "./constants";

export function renameButtonTextSave(submitButton) {
  switch (submitButton.textContent){
    case messages.save:
      submitButton.textContent = messages.saving;
      break;
    default:
      submitButton.textContent = messages.save;
  }
}

export function addAnimationClass(popup){
  popup.classList.add("popup_is-animated");
}

