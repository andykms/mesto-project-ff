import { createCard, toggleLikeCard, deleteCard} from './components/card';
import { closeModal, openModal } from './components/modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, patchUserInfo, postCard, patchUserAvatar } from './components/api';
import './pages/index.css';
import { messages, selectorNames, baseSelectors } from './constants';
import { renameButtonTextSave, addAnimationClass } from './utils';


//Вызов функции для вставки проверок инпутов
enableValidation(selectorNames);

const content = document.querySelector(baseSelectors.content);
const cardList = content.querySelector(baseSelectors.cardList);

const addCard = document.querySelector(baseSelectors.addCard).content;

const popupEdit = document.querySelector(baseSelectors.popupEdit);
addAnimationClass(popupEdit);

const popupNewCard = document.querySelector(baseSelectors.popupNewCard);
addAnimationClass(popupNewCard);

const popupImage = document.querySelector(baseSelectors.popupImage);
const modalCaption = popupImage.querySelector(baseSelectors.modalCaption);

const popupEditAvatar = document.querySelector(baseSelectors.popupEditAvatar);
addAnimationClass(popupEditAvatar);

const popupDeleteCard = document.querySelector(baseSelectors.popupDeleteCard);
addAnimationClass(popupDeleteCard);

const modalImage = popupImage.querySelector(baseSelectors.modalImage);
addAnimationClass(popupImage);


const buttonEditProfile = content.querySelector(baseSelectors.buttonEditProfile);
const buttonAddCard = content.querySelector(baseSelectors.buttonAddCard);
const profileTitle = content.querySelector(baseSelectors.profileTitle);
const profileDescription = content.querySelector(baseSelectors.profileDescription);
const profileImage = content.querySelector(baseSelectors.profileImage);


function insertServerUserInfo(userInfoJson) {
    profileTitle.textContent = userInfoJson.name;
    profileDescription.textContent = userInfoJson.about;
    profileImage.style.backgroundImage = `url(${userInfoJson.avatar})`;
}

function insertServerCards(cards, myUserId) {
  cards.forEach((card)=>{
      addNewCard(createCard(addCard, card.name, card.link, checkMyAuthorship(myUserId, card.owner._id), card.likes.length, checkOnMyLike(myUserId, card.likes), card._id, {openConfirmationPopup, toggleLikeCard, openImageModal, deleteCard}));
    });
}

function checkMyAuthorship(myId, ownerId) {
  if(myId === ownerId) {
    return true
  } else {
    return false
  }
}

function checkOnMyLike(myId, likes) {
  return likes.some((userId)=>{
    return userId._id === myId
  });
}

buttonEditProfile.addEventListener('click', openFormEdit);
buttonAddCard.addEventListener('click', openFormAddCard);
profileImage.addEventListener('click', openFormEditAvatar);

//Вызов промиса для отображения данных пользователя и карточек
Promise.all([getUserInfo(), getCards()])
  .then((results) => {
    insertServerUserInfo(results[0]);
    insertServerCards(results[1], results[0]._id);
  })
  .catch((err)=>{
    console.log(`${messages.errorGiveProfile} ${err}`);
  })

const formEdit = document.forms.edit_profile;
const nameInput  = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const submitFormEdit = formEdit.querySelector(baseSelectors.submitButton);

const formAddCard = document.forms.new_place;
const placeInput = formAddCard.elements.place_name;
const linkInput = formAddCard.elements.link;
const submitFormAddCard = formAddCard.querySelector(baseSelectors.submitButton);

const formEditAvatar = document.forms.new_avatar;
const avatarUrlInput = formEditAvatar.elements.link;
const submitFormEditAvatar = formEditAvatar.querySelector(baseSelectors.submitButton);

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  renameButtonTextSave(submitFormEdit);
  renameProfile(newName, newDescription);
});

formAddCard.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const newCardPlace = placeInput.value;
  const newCardLink = linkInput.value;
  renameButtonTextSave(submitFormAddCard);
  postNewCard(newCardPlace, newCardLink);
});

formEditAvatar.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renameButtonTextSave(submitFormEditAvatar);
  changeAvatar(avatarUrlInput.value);
});

function renameProfile(newName, newDescription) {
  patchUserInfo(newName, newDescription)
    .then((userInfoJson)=>{
      insertServerUserInfo(userInfoJson);
      closeModal(popupEdit);
    })
    .catch((err)=>{
      console.log(`${messages.errorUpdateProfile} ${err}`);
    })
    .finally(()=>{
      renameButtonTextSave(submitFormEdit);
    })
}

function postNewCard(newCardPlace, newCardLink) {
  postCard(newCardPlace, newCardLink)
    .then((cardJson)=>{
      const newCard = createCard(addCard, cardJson.name, cardJson.link, true, cardJson.likes.length, false, cardJson._id, {openConfirmationPopup, toggleLikeCard, openImageModal, deleteCard});
      addNewCard(newCard, 0);
      formAddCard.reset();
      clearValidation(formAddCard, selectorNames);
      closeModal(popupNewCard);
    })
    .catch((err)=>{
      console.log(`${messages.errorPublicateCard} ${err}`);
    })
    .finally(() =>{
      renameButtonTextSave(submitFormAddCard);
    })
}

function changeAvatar(url) {
  patchUserAvatar(url)
    .then((res)=>{
      insertServerUserInfo(res);
      formEditAvatar.reset();
      clearValidation(formEditAvatar, selectorNames);
      closeModal(popupEditAvatar);
    })
    .catch((err)=>{
      console.log(`${messages.errorChangeAvatar} ${err}`);
    })
    .finally(()=>{
      renameButtonTextSave(submitFormEditAvatar);
    });
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

function openFormEditAvatar(evt) {
  openModal(evt, popupEditAvatar);
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


function openConfirmationPopup(evt, deleteCard, cardId) {
  popupDeleteCard.id = cardId;
  openModal(evt, popupDeleteCard);
  popupDeleteCard.addEventListener('submit', deleteCard);
}