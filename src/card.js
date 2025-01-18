import { initialCards } from './cards';
import { cardList, addCard } from './index';
import { openModal } from './modal';
import { popupImage } from './index';


export function createCardsList() {
  initialCards.forEach(function(item) {
    addNewCard(createCard(item['name'], item['link'], deleteCard, likeOrUnlikeCard), -1);
  });
}

export function createCard(name, link, deleteCard, likeOrUnlikeCard) {
  const newCard = addCard.querySelector('li').cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',(evt)=> openModal(evt, popupImage));

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

function likeOrUnlikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

