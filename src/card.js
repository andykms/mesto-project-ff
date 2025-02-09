export function createCard(addCard, name, link, deleteCard, likeOrUnlikeCard, openImageModal, isMyCard, likeCount, hasMyLike, cardId) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',openImageModal);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = newCard.querySelector('.card__delete-button');
  
  if(isMyCard) {
    deleteButton.addEventListener('click', (evt) => deleteCard(evt, cardId));
  } else {
    deleteButton.remove();
  }

  const likeCountElement = newCard.querySelector('.card__like-count');
  likeCountElement.textContent = likeCount;

  const likeButton = newCard.querySelector(".card__like-button");

  if(hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener('click', (evt) => likeOrUnlikeCard(evt, cardId, likeCountElement));
  
  return newCard;
}

