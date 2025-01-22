export function createCard(addCard, name, link, deleteCard, likeOrUnlikeCard, openImageModal) {
  const newCard = addCard.querySelector(".places__item").cloneNode(true);

  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = name;
  cardImg.addEventListener('click',openImageModal);

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

export function likeOrUnlikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

