import { createCard, deleteCard, likeOrUnlikeCard} from './card';
import { closeModal, addClassesOpen, addListenersOpen } from './modal';
import { initialCards } from './cards';

import './pages/index.css';

const content = document.querySelector('.content');
export const cardList = content.querySelector('.places__list');

const addCard = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
addAnimationClass(popupEdit);
const popupNewCard = document.querySelector('.popup_type_new-card');
addAnimationClass(popupNewCard);
const popupImage = document.querySelector('.popup_type_image');
const modalCaption = popupImage.querySelector(".popup__caption");
const modalImage = popupImage.querySelector(".popup__image");
addAnimationClass(popupImage);


const buttonEditProfile = content.querySelector(".profile__edit-button");

const buttonAddCard = content.querySelector(".profile__add-button");

const profileTitle = content.querySelector(".profile__title");

const profileDescription = content.querySelector(".profile__description");

const patternErrorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";

createCardsList();

buttonEditProfile.addEventListener('click', openFormEdit);
buttonAddCard.addEventListener('click', openFormAddCard);

const formEdit = document.forms.edit_profile;
const nameInput  = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const buttonFormEdit = formEdit.querySelector('.popup__button');

const formAddCard = document.forms.new_place;
const placeInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;
const buttonFormAddCard = formAddCard.querySelector('.popup__button');

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  renameProfile(newName, newDescription);
  formEdit.reset();
  closeModal(popupEdit);
});

formAddCard.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const newCardPlace = placeInput.value;
  const newCardLink = linkInput.value;
  const newCard = createCard(addCard, newCardPlace, newCardLink, deleteCard, likeOrUnlikeCard, openImageModal);
  addNewCard(newCard, 0);
  formAddCard.reset();
  buttonFormAddCard.classList.add('button_inactive');
  closeModal(popupNewCard);
});

function renameProfile(newName, newDescription) {
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
}

function addAnimationClass(popup){
  popup.classList.add("popup_is-animated");
}

function openFormEdit(evt) {
  formEdit.reset();
  checkErrorClassesInput(formEdit, nameInput);
  checkErrorClassesInput(formEdit, jobInput);
  if(buttonFormEdit.classList.contains('button_inactive')) {
    buttonFormEdit.classList.remove('button_inactive');
  }
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(evt, popupEdit);
}

function openFormAddCard(evt) {
  openModal(evt, popupNewCard);
}

function checkErrorClassesInput(formElement, inputElement) {
  if (inputElement.classList.contains("popup__input_type_error")) {
    hideInputError(formElement, inputElement);
  }
}

function createCardsList() {
  initialCards.forEach(function(item) {
    addNewCard(createCard(addCard, item['name'], item['link'], deleteCard, likeOrUnlikeCard, openImageModal), -1);
  });
}

function openModal(evt,modalWindow) {
  addClassesOpen(modalWindow);
  addListenersOpen(modalWindow);
}

function openImageModal(evt) {
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
  openModal(evt, popupImage);
}

function addNewCard(newCard, index) {
  switch (index){
    case 0:
      cardList.prepend(newCard);
      break;
    default:
      cardList.append(newCard);
  }
}

enableValidation();

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector(".popup__button");
  
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
  }
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, patternErrorMessage);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement)=> {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

