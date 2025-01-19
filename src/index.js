import { createCard, deleteCard, addNewCard, likeOrUnlikeCard} from './card';
import {openModal, closeModal, removeListeners} from './modal';
import { initialCards } from './cards';

import './pages/index.css';

const content = document.querySelector('.content');
export const cardList = content.querySelector('.places__list');

export const addCard = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
addAnimationClass(popupEdit);
const popupNewCard = document.querySelector('.popup_type_new-card');
addAnimationClass(popupNewCard);
export const popupImage = document.querySelector('.popup_type_image');
export const modalImage = popupImage.querySelector(".popup__image");
addAnimationClass(popupImage);


const buttonEditProfile = content.querySelector(".profile__edit-button");

const buttonAddCard = content.querySelector(".profile__add-button");

const profileTitle = content.querySelector(".profile__title");

const profileDescription = content.querySelector(".profile__description");


createCardsList();

buttonEditProfile.addEventListener('click', (evt) => openForm(evt, popupEdit));
buttonAddCard.addEventListener('click', (evt) => openForm(evt, popupNewCard));

const formEdit = document.forms.edit_profile;
const nameInput  = formEdit.elements.name;
const jobInput = formEdit.elements.description;

const formAddCard = document.forms.new_place;
const placeInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  renameProfile(newName, newDescription);
  closeForm(popupEdit, formEdit);
});

formAddCard.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const newCardPlace = placeInput.value;
  const newCardLink = linkInput.value;
  const newCard = createCard(newCardPlace, newCardLink, deleteCard, likeOrUnlikeCard);
  addNewCard(newCard, 0);
  closeForm(popupNewCard, formAddCard);
});

function renameProfile(newName, newDescription) {
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
}

function closeForm(popup, form) {
  form.reset();
  closeModal(popup);
  clearInputs(popup);
}

function addAnimationClass(popup){
  popup.classList.add("popup_is-animated");
}

function openForm(evt, popup) {
  openModal(evt, popup);
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains("popup") ||
       evt.target.classList.contains("popup__close")){
      clearInputs(popup);
    };
  });
  document.addEventListener('keyup', checkCloseEscapeForm);
}

function checkCloseEscapeForm(evt) {
  if(evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    clearInputs(popup);
    document.removeEventListener('keyup', checkCloseEscapeForm);
  }
}

function clearInputs(modalWindow) {
  const inputs = modalWindow.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}

function createCardsList() {
  initialCards.forEach(function(item) {
    addNewCard(createCard(item['name'], item['link'], deleteCard, likeOrUnlikeCard), -1);
  });
}