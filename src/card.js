import { deleteCardFromServer } from "./api";

export function createCard(addCard, name, link, deleteCard, likeOrUnlikeCard, openImageModal, isMyCard, likes, cardId) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);
  newCard.id = cardId;

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',openImageModal);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  if(isMyCard) {
    deleteButton.addEventListener('click', deleteCard);
  } else {
    deleteButton.remove();
  }

  const likeCount = newCard.querySelector('.card__like-count');
  likeCount.textContent = likes.length;

  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener('click', likeOrUnlikeCard);

  return newCard;
}


export function deleteCard(event) {
  const listItem = event.target.closest('li');
  const cardId = listItem.id;

  deleteCardFromServer(cardId)
    .then(()=>{
      listItem.remove();
    })
    .catch((err)=>{
      console.log(`К сожалению, не смогли удалить публикацию: ошибка ${err}`);
    });
}

export function likeOrUnlikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

