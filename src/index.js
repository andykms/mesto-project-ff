import {createCardsList, createCard, deleteCard, addNewCard} from './card';
import {openModal, closeModal} from './modal';

import './pages/index.css';

const content = document.querySelector('.content');

//Экспортируем список карточек для добавления в card.js
export const cardList = content.querySelector('.places__list');

//Экспортируем заготовку карточки в card.js
export const addCard = document.querySelector('#card-template').content;

//Попап для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');

//Попап для добавления карточки 
const popupNewCard = document.querySelector('.popup_type_new-card');

//Экспортируем попап Изображения в card.js чтобы добавлять его в функцию addEventListener
export const popupImage = document.querySelector('.popup_type_image');

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
buttonEditProfile.addEventListener('click', (evt) => openModal(evt, popupEdit));
buttonAddCard.addEventListener('click', (evt) => openModal(evt, popupNewCard));

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
  formEdit.reset();
  closeModal();
});

formAddCard.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const newCardPlace = placeInput.value;
  const newCardLink = linkInput.value;
  const newCard = createCard(newCardPlace, newCardLink, deleteCard);
  addNewCard(newCard, 0);
  formAddCard.reset();
  closeModal();
});

function renameProfile(newName, newDescription) {
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
}



