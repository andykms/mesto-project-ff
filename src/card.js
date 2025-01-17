import { initialCards } from './cards';
import { cardList, addCard } from './index';
import { openModal } from './modal';
import { popupImage } from './index';


export function createCardsList() {
  initialCards.forEach(function(item) {
    cardList.append(createCard(item['name'], item['link'], deleteCard));
  });
}

export function createCard(name, link, deleteCard) {
  const newCard = addCard.querySelector('li').cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  newCard.addEventListener('click',(evt)=> openModal(evt, popupImage));
  return newCard;
}


export function deleteCard(event) {
  const listItem = event.target.closest('li');
  listItem.remove();
}
