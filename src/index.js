import { createCard} from './card';
import { closeModal, addClassesOpen, addListenersOpen } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, patchUserInfo, postCard, deleteCardFromServer, putLike, deleteLike, patchUserAvatar } from './api';
import './pages/index.css';
import { messages, selectorNames, baseSelectors } from './constants';
import { renameButtonTextSave, addAnimationClass } from './utils';


//Вызов функции для вставки проверок инпутов
enableValidation(selectorNames);

const content = document.querySelector(baseSelectors.content);
const contentPage = document.querySelector(baseSelectors.contentPage);
const cardList = content.querySelector(baseSelectors.cardList);

const addCard = document.querySelector(baseSelectors.addCard).content;

const popupEdit = document.querySelector(baseSelectors.popupEdit);
addAnimationClass(popupEdit);

const popupNewCard = document.querySelector(baseSelectors.popupNewCard);
addAnimationClass(popupNewCard);

const popupImage = document.querySelector(baseSelectors.popupImage);
const modalCaption = popupImage.querySelector(baseSelectors.modalCaption);

const popupEditAvatar = document.querySelector(baseSelectors.popupEditAvatar);

const popupDeleteCardTemplate = document.querySelector(baseSelectors.popupDeleteCardTemplate).content;

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
      addNewCard(createCard(addCard, card.name, card.link, deleteCard, likeOrUnlikeCard, openImageModal, checkMyAuthorship(myUserId, card.owner._id), card.likes.length, checkOnMyLike(myUserId, card.likes), card._id));
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
  submitFormEdit.textContent = messages.saving;
  renameProfile(newName, newDescription);
});

formAddCard.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const newCardPlace = placeInput.value;
  const newCardLink = linkInput.value;
  submitFormAddCard.textContent = messages.saving;
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
      const newCard = createCard(addCard, cardJson.name, cardJson.link, deleteCard, likeOrUnlikeCard, openImageModal, true, cardJson.likes.length, false, cardJson._id);
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

function deleteCard(event, cardId) {
  const listItem = event.target.closest('li');
  
  const popupDeleteCard = popupDeleteCardTemplate.querySelector(baseSelectors.popupDeleteCard).cloneNode(true);
  if(contentPage.querySelector(baseSelectors.popupDeleteCard)) {
    contentPage.querySelector(baseSelectors.popupDeleteCard).remove();
  }
  contentPage.append(popupDeleteCard);
  openModal(event, popupDeleteCard);
  document.forms.delete_confirm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    deleteCardFromServer(cardId)
      .then(()=>{
        listItem.remove();
      })
      .catch((err)=>{
        console.log(`${messages.errorDeleteCard} ${err}`);
      })
      .finally(()=>{
        closeModal(popupDeleteCard);
        popupDeleteCard.remove();
      })
  })
}

function likeOrUnlikeCard(evt, cardId, likeCount) {
  const likeButton = evt.target;
  if(likeButton.classList.contains(baseSelectors.cardLikeButtonActive)) {
    deleteLike(cardId)
    .then((res)=>{
      likeButton.classList.remove(baseSelectors.cardLikeButtonActive);
      likeCount.textContent = res.likes.length;
    })
    .catch((err)=>{
      console.log(`${messages.errorDeleteLike} ${err}`);
    })
  } else {
    putLike(cardId)
      .then((res)=>{
        likeButton.classList.add(baseSelectors.cardLikeButtonActive);
        likeCount.textContent = res.likes.length;
      })
      .catch((err)=>{
        console.log(`${messages.errorPutLike} ${err}`);
      })
  }
}