import { cardList, addCard, popupImage, modalImage } from './index';
import { openModal } from './modal';

export function createCard(name, link, deleteCard, likeOrUnlikeCard) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',(evt)=> openImageModal(evt, popupImage));

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener('click', likeOrUnlikeCard);

  return newCard;
}


export function deleteCard(event) {
  const listItem = event.target.closest('li');
  listItem.remove();
}

export function addNewCard(newCard, index) {
  switch (index){
    case 0:
      cardList.prepend(newCard);
      break;
    default:
      cardList.append(newCard);
  }
}

export function likeOrUnlikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function openImageModal(evt, modalWindow) {
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  const modalCaption = modalWindow.querySelector(".popup__caption");
  modalCaption.textContent = evt.target.alt;
  openModal(evt, modalWindow);
}