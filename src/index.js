import {createCardsList, createCard, deleteCard, addNewCard, likeOrUnlikeCard} from './card';
import {openModal, closeModal} from './modal';

import './pages/index.css';

const content = document.querySelector('.content');

//Экспортируем список карточек для добавления в card.js
export const cardList = content.querySelector('.places__list');

//Экспортируем заготовку карточки в card.js
export const addCard = document.querySelector('#card-template').content;

//Попап для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
addAnimationClass(popupEdit);
//Попап для добавления карточки 
const popupNewCard = document.querySelector('.popup_type_new-card');
addAnimationClass(popupNewCard);
//Экспортируем попап Изображения в card.js чтобы добавлять его в функцию addEventListener
export const popupImage = document.querySelector('.popup_type_image');
addAnimationClass(popupImage);

export const modalImage = popupImage.querySelector(".popup__image");

//Кнопка для изменения профиля
const buttonEditProfile = content.querySelector(".profile__edit-button");

//Кнопка для добавления новой карточки
const buttonAddCard = content.querySelector(".profile__add-button");

//Заголовок профиля
const profileTitle = content.querySelector(".profile__title");

//Описание профиля
const profileDescription = content.querySelector(".profile__description");


//Функция из card.js, чтобы добавить карточки из объекта cards.js
createCardsList();

//Добавляем кнопкам на странице (редактирования профиля и добавления карточки) проверку на нажатие
buttonEditProfile.addEventListener('click', (evt) => openForm(evt, popupEdit, formEdit));
buttonAddCard.addEventListener('click', (evt) => openForm(evt, popupNewCard, formAddCard));

//Поля формы редактирования профиля
const formEdit = document.forms.edit_profile;
const nameInput  = formEdit.elements.name;
const jobInput = formEdit.elements.description;

//Поля формы добавления карточки
const formAddCard = document.forms.new_place;
const placeInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;

//Добавляем форме редактирования профиля слушатель события на подтверждение ввода 
formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  renameProfile(newName, newDescription);
  closeForm(popupEdit, formEdit);
});

//Добавляем форме добавления карточки слушатель события на подтверждение ввода
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

function openForm(evt, popup, form) {
  openModal(evt, popup);
  popup.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains("popup") ||
       evt.target.classList.contains("popup__close")){
      clearInputs(popup);
    };
  });
  document.addEventListener('keyup', checkCloseModalWithForm);
}

function checkCloseModalWithForm(evt) {
  if(evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    clearInputs(popup);
    document.removeEventListener('keyup', checkCloseModalWithForm);
  }
}

function clearInputs(modalWindow) {
  const inputs = modalWindow.querySelectorAll(".popup__input");
  inputs.forEach((input) => input.value = '');
}

