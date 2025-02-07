import { createCard} from './card';
import { closeModal, addClassesOpen, addListenersOpen } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, patchUserInfo, postCard, deleteCardFromServer, putLike, deleteLike } from './api';
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
const profileImage = content.querySelector(".profile__image");



function insertServerUserInfo(userInfoJson) {
    profileTitle.textContent = userInfoJson.name;
    profileDescription.textContent = userInfoJson.about;
    profileImage.style.backgroundImage = `url(${userInfoJson.avatar})`;
}

function insertServerCards(cards, myUserId) {
  cards.forEach((card)=>{
      addNewCard(createCard(addCard, card.name, card.link, deleteCard, likeOrUnlikeCard, openImageModal, checkMyAuthorship(myUserId, card.owner._id), card.likes.length, checkOnMyLike(myUserId, card.likes), card._id));
    });
}

function checkMyAuthorship(myId, ownerId) {
  if(myId === ownerId) {
    return true
  }
  else {
    return false
  }
}

function checkOnMyLike(myId, likes) {
  return likes.some((userId)=>{
    return userId._id === myId
  });
}

Promise.all([getUserInfo(), getCards()])
  .then((results) => {
    insertServerUserInfo(results[0]);
    insertServerCards(results[1], results[0]._id);
  })
  .catch((err)=>{
    console.log(`К сожалению, не смогли получить профиль: ошибка ${err}`);
  })

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
  postCard(newCardPlace, newCardLink)
    .then((cardJson)=>{
      const newCard = createCard(addCard, cardJson.name, cardJson.link, deleteCard, likeOrUnlikeCard, openImageModal, true, cardJson.likes.length, false, cardJson._id);
      addNewCard(newCard, 0);
    })
    .catch((err)=>{
      console.log(`К сожалению, не смогли опубликовать новое место: ошибка ${err}`);
    })
  formAddCard.reset();
  clearValidation(formAddCard, selectorNames);
  closeModal(popupNewCard);
});

function renameProfile(newName, newDescription) {
  patchUserInfo(newName, newDescription)
    .then((userInfoJson)=>{
      insertServerUserInfo(userInfoJson);
    })
    .catch((err)=>{
      console.log(`К сожалению, не смогли обновить данные профиля: ошибка ${err}`);
    });
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

function deleteCard(event, cardId) {
  const listItem = event.target.closest('li');

  deleteCardFromServer(cardId)
    .then(()=>{
      listItem.remove();
    })
    .catch((err)=>{
      console.log(`К сожалению, не смогли удалить публикацию: ошибка ${err}`);
    });
}

function likeOrUnlikeCard(evt, cardId, likeCount) {
  if(evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
    .then((res)=>{
      evt.target.classList.remove("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    })
    .catch((err)=>{
      console.log(`К сожалению, произошла ошибка при снятии лайка: ошибка ${err}`);
    })
  } else {
    putLike(cardId)
      .then((res)=>{
        evt.target.classList.add("card__like-button_is-active");
        likeCount.textContent = res.likes.length;
      })
      .catch((err)=>{
        console.log(`К сожалению, произошла ошибка при поставлении лайка: ошибка ${err}`);
      })
  }
}