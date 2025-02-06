import { createCard, deleteCard, likeOrUnlikeCard} from './card';
import { closeModal, addClassesOpen, addListenersOpen } from './modal';
import { initialCards } from './cards';
import { enableValidation, hideInputError, toggleButtonState } from './validation';
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

createCardsList();

buttonEditProfile.addEventListener('click', openFormEdit);
buttonAddCard.addEventListener('click', openFormAddCard);


const selectorNames = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  patternErrorMessage: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
};


const formEdit = document.forms.edit_profile;
const nameInput  = formEdit.elements.name;
const jobInput = formEdit.elements.description;
//const buttonFormEdit = formEdit.querySelector(selectorNames.submitButtonSelector);

const formAddCard = document.forms.new_place;
const placeInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;
//const buttonFormAddCard = formAddCard.querySelector(selectorNames.submitButtonSelector);

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
  clearValidation(formAddCard, selectorNames);
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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEdit, selectorNames);
  openModal(evt, popupEdit);
}

function openFormAddCard(evt) {
  openModal(evt, popupNewCard);
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

enableValidation(selectorNames);

function clearValidation(formElement, selectorNames) {
  const inputList = Array.from(formElement.querySelectorAll(selectorNames.inputSelector));
  const buttonElement = formElement.querySelector(selectorNames.submitButtonSelector);

  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains(selectorNames.inputErrorClass)) {
      hideInputError(formElement, inputElement, selectorNames.inputErrorClass);
    }
  });
  toggleButtonState(inputList, buttonElement, selectorNames.inactiveButtonClass);
}
