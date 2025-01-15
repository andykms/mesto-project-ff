import {createCardsList} from './card';
import {openModal} from './modal';
import './pages/index.css';

const content = document.querySelector('.content');
export const cardList = content.querySelector('.places__list');
export const addCard = document.querySelector('#card-template').content;
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

createCardsList();

buttonEditProfile.addEventListener('click', (evt) => openModal(evt, popupEdit));
buttonAddCard.addEventListener('click', (evt)=>openModal(evt, popupNewCard));